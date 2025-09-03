<template>
  <div class="invariant-selector">
    <v-row dense>
      <v-col cols="12" md="4">
        <v-select
          :items="resourceTypes"
          label="Resource Type"
          v-model="selectedResource"
          :loading="loadingResources"
          :disabled="loadingResources || disabled"
          dense outlined
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="invariantItems"
          label="Invariant"
          v-model="selectedInvariant"
          :loading="loadingInvariants"
          :disabled="!selectedResource || loadingInvariants || disabled"
          item-text="label"
          item-value="key"
          dense outlined
        />
      </v-col>
      <v-col cols="12" md="2" class="d-flex align-center">
        <v-btn color="primary" :disabled="!selectedResource || !selectedInvariant || disabled" :loading="loadingInvariants" @click="emitLoad">
          Load
        </v-btn>
      </v-col>
    </v-row>
  </div>
  
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { getResourceTypes, getInvariantsForResourceType, Invariant } from '~/helpers/fhirBuildApi';

export default Vue.extend({
  props: {
    disabled: { type: Boolean as PropType<boolean>, default: false },
    initialResourceType: { type: String as PropType<string | undefined>, default: undefined },
    initialInvariantId: { type: String as PropType<string | undefined>, default: undefined },
    autoLoad: { type: Boolean as PropType<boolean>, default: false },
  },
  data() {
    return {
      loadingResources: false,
      loadingInvariants: false,
      resourceTypes: [] as string[],
      invariantItems: [] as Array<{ key: string; label: string; expression?: string }>,
      selectedResource: undefined as string | undefined,
      selectedInvariant: undefined as string | undefined,
    };
  },
  async mounted() {
    await this.loadResources();
    await this.tryApplyInitials();
  },
  methods: {
    async loadResources() {
      try {
        this.loadingResources = true;
        this.resourceTypes = await getResourceTypes();
      } finally {
        this.loadingResources = false;
      }
    },
    async loadInvariants() {
      if (!this.selectedResource) return;
      try {
        this.loadingInvariants = true;
        const invariants: Invariant[] = await getInvariantsForResourceType(this.selectedResource);
        this.invariantItems = invariants.map((inv) => ({ key: inv.key, label: `${inv.key}${inv.human ? ' — ' + inv.human : ''}`, expression: inv.expression }));
      } catch (e) {
        this.invariantItems = [];
      } finally {
        this.loadingInvariants = false;
      }
    },
    async tryApplyInitials() {
      // Apply initial resource/invariant if provided
      if (this.initialResourceType) {
        const match = this.resourceTypes.find(r => r.toLowerCase() === this.initialResourceType!.toLowerCase());
        if (match) {
          this.selectedResource = match;
          await this.loadInvariants();
          if (this.initialInvariantId) {
            const invMatch = this.invariantItems.find(i => i.key.toLowerCase() === this.initialInvariantId!.toLowerCase());
            if (invMatch) this.selectedInvariant = invMatch.key;
          }
          if (this.autoLoad && this.selectedResource && this.selectedInvariant) {
            this.emitLoad();
          }
        }
      }
    },
    emitLoad() {
      if (!this.selectedResource || !this.selectedInvariant) return;
      const selected = this.invariantItems.find((i) => i.key === this.selectedInvariant);
      this.$emit('onLoad', {
        resourceType: this.selectedResource,
        invariantId: this.selectedInvariant,
        expression: selected?.expression,
      });
    },
  },
  watch: {
    selectedResource() {
      this.selectedInvariant = undefined;
      this.invariantItems = [];
      this.loadInvariants();
    },
    async initialResourceType() {
      await this.tryApplyInitials();
    },
    async initialInvariantId() {
      await this.tryApplyInitials();
    },
  },
});
</script>

<style scoped>
.invariant-selector {
  width: 100%;
}
</style>
