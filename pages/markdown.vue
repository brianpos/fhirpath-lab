<template>
  <div class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px">
      <br />
      <p class="leader">
        FHIR markdown content assistant
      </p>
      <br />
      <div>
        <v-text-field label="Field" v-model="fieldname"/>
      </div>
      <div class="home-grid">
        <v-textarea label="Value"
          title="The Description is shown alongside the Title when a user is selecting the Questionnaire from a directory. This field supports Markdown formatting"
          v-model="description" auto-grow hide-details="auto" clearable
          rows="2" />
        <span class="markdown"
          title="(preview) The Description is shown alongside the Title when a user is selecting the Questionnaire from a directory."
          v-html="convertHtml(description)" />

      </div>
      <div>
        <pre class="extractme" v-text="JSON.stringify(description, null, 2)" />
        <pre class="extractme" v-text="convertXml(description)" />
      </div>
      <br />
    </div>
  </div>
</template>

<style lang="scss">
span.markdown > blockquote {
    padding-left: 8px;
    border-left: lightblue 4px solid;
}

</style>

<style lang="scss" scoped>
span.markdown p {
    margin-bottom: 8px;
}
.home-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  grid-auto-flow: dense;
}

.extractme {
  margin-top: 8px;
  padding: 12px;
  border: silver 1px solid;
}

.leader {
  font-size: x-large;
}

.link-plain-text {
  text-decoration: initial;
  color: initial;
}

p {
  text-align: justify;
  text-justify: inter-word;
}

.main::before {
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('/fhir-lab-ico-300x300.png');
  background-position: center;
  background-attachment: fixed;
  /* Center the image */
  opacity: 0.2;
  z-index: -1;
}

.grid-span-2 {
  grid-column: span 2;
}

.logo {
  vertical-align: middle;
  justify-self: center;
  grid-row: span 6;
  grid-column: 3/5;
}

h5 {
  font-size: 18px;
}

.extra-links {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px 24px;
  grid-auto-flow: dense;

}

@media (max-width: 1200px) {
  .home-grid {
    grid-template-columns: auto 1fr auto 1fr;
  }

  .logo {
    grid-column: span 2;
    grid-row: span 4;
  }
}

@media (max-width: 1024px) {
  .home-grid {
    grid-template-columns: auto 1fr;
  }
}

@media (max-width: 596px) {
  .home-grid {
    grid-template-columns: auto;
    gap: 0;
  }

  .grid-span-2 {
    grid-column: span 1 !important;
  }

  .link-item {
    margin-top: 12px;
    justify-self: left !important;
  }
}
</style>
<script lang="ts">
import Vue, { PropType } from "vue";
import { ConformanceResourceInterface } from "~/models/ConformanceResourceInterface";
import { marked } from "marked";
import { expandValueSet, splitCanonical } from "~/helpers/searchFhir";
import { settings } from "~/helpers/user_settings";

export default Vue.extend({
  mounted() {
    this.initializeDropdowns();
  },
  props: {
    readonly: Boolean,
    showAdvancedSettings: Boolean,
    raw: Object as PropType<ConformanceResourceInterface>,
  },
  methods: {
    async initializeDropdowns() {
      const stgs = settings.load();

    },
    /** Convert the parameter data into a HTML from markdown format */
    convertHtml(field: string | undefined): string {
      if (!field) return "";
      return marked(field);
    },
    convertXml(field: string | undefined): string {
      if (!field) return "";
      return "<"+this.fieldname+" value=" + JSON.stringify(field)
                  .replaceAll('&', "&amp;")
                  .replaceAll("\\n", "&#xD;")
                  .replaceAll('\\"', "&quot;")
                  .replaceAll('<', "&lt;")
                  .replaceAll('>', "&gt;")
                   + " />";
    },
  },
  data() {
    return {
      fieldname: "documentation",
      description: "Some test **markdown content**\n\nnow",
    };
  }
});
</script>
