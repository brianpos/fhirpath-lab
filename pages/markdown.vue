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
        <v-text-field label="Field" v-model="fieldname" />
      </div>
      <div class="home-grid">
        <v-textarea label="Value" v-model="description" auto-grow hide-details="auto" clearable rows="2" />
        <span class="markdown" v-html="convertHtml(description)" />

      </div>
      <br />
      <v-textarea label="JSON formatted property" outlined @paste="loadFromJson" :value="convertJson(description)"
        @focus="event => event.target.select()" auto-grow hide-details="auto" clearable rows="2">
        <template v-slot:append>
          <v-btn icon small tile @click="copyToClipboard(convertJson(description))" title="Copy JSON fragment">
            <v-icon> mdi-content-copy </v-icon>
          </v-btn>
        </template>
      </v-textarea>
      <br />
      <v-textarea label="XML formatted property" outlined @paste="loadFromXml" :value="convertXml(description)" auto-grow
        @focus="event => event.target.select()" hide-details="auto" clearable rows="2">
        <template v-slot:append>
          <v-btn icon small tile @click="copyToClipboard(convertXml(description))" title="Copy XML fragment">
            <v-icon> mdi-content-copy </v-icon>
          </v-btn>
        </template>
      </v-textarea>
      <br />
      <div>
        You can copy the XML or JSON fragment from your fhir resource and paste it into the corresponding field
        to be able to quiclky edit it in the other fields, then use the copy button to put the result back into your
        resource.
      </div>
    </div>
  </div>
</template>

<style lang="scss">
span.markdown>blockquote {
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
    loadFromJson(event: ClipboardEvent) {
      const data = event.clipboardData?.getData('text');
      console.log('paste JSON: ', data);
      event.preventDefault();
      try {
        const obj = JSON.parse("{" + data + "}");
        console.log('paste JSON: ', Object.keys(obj));
        var keys = Object.keys(obj);
        if (keys && keys.length === 1) {
          this.fieldname = Object.keys(obj)[0]
          this.description = obj[this.fieldname];
        }
      }
      catch (err) {
        console.log('paste JSON err: ', err);
      }
    },
    loadFromXml(event: ClipboardEvent) {
      const data = event.clipboardData?.getData('text');
      console.log('paste XML: ', data);
      event.preventDefault();

      try {
        if (data?.startsWith("<")) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "application/xml");
          this.fieldname = doc.documentElement.nodeName;
          console.log(doc.documentElement.attributes[0].nodeValue);
          this.description = doc.documentElement.attributes[0].nodeValue + "";
        }
      }
      catch (err) {
        console.log('paste XML err: ', err);
      }
    },
    copyToClipboard(value: string) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value);
      }
    },
    /** Convert the parameter data into a HTML from markdown format */
    convertHtml(field: string | undefined): string {
      if (!field) return "";
      return marked(field);
    },
    convertJson(field: string | undefined): string {
      if (!field) return "";
      return '"' + this.fieldname + '": ' + JSON.stringify(field, null, 2);
    },
    convertXml(field: string | undefined): string {
      if (!field) return "";
      return "<" + this.fieldname + " value=" + JSON.stringify(field)
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
