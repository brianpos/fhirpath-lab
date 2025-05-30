<template>
  <div class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px">
      <br />
      <p class="leader">
        FHIRPath is heavily used in FHIR to define validations in <a href="StructureDefinition">profiles</a>, properties
        to index in <a href="SearchParameter">search definitions</a> and various features inside
        questionnaires. This fhirpath lab is an open source tool to simplify testing fhirpath
        expressions against the various open source fhirpath engines available.
      </p>
      <br />
      <div class="home-grid">
        <v-btn dark color="#3F81AE" class="link-item text-decoration-none" href="FhirPath">
          <v-icon left> mdi-bug-outline </v-icon>
            Tester
        </v-btn>
        <a href="FhirPath" class="link-plain-text">
          <div>
            Quick Test page for testing any FHIRPath expressions
          </div>
        </a>
        <v-btn dark color="#3F81AE" class="link-item text-decoration-none" href="Library">
          <v-icon left> mdi-library-outline </v-icon>
            Library
        </v-btn>
        <a href="Library" class="link-plain-text">
          <div>
            A library of FHIRPath expressions for sharing between other resources, to
            maintain the logic more easily
          </div>
        </a>
        <v-btn dark color="#3F81AE" class="link-item text-decoration-none" href="fml">
          <v-icon left> mdi-chart-gantt </v-icon>
            Mapper
        </v-btn>
        <a href="fml" class="link-plain-text">
          <div>
            Test page for mapping to/from FHIR resources using the <a href="https://www.hl7.org/fhir/mapping-language.html">FHIR Mapping Language</a>
          </div>
        </a>
        <v-btn dark color="#3F81AE" class="link-item text-decoration-none" href="sqlonfhir">
          <v-icon left> mdi-database-search </v-icon>
            sql-on-fhir
        </v-btn>
        <a href="sqlonfhir" class="link-plain-text">
          <div>
            Test page for FHIR view definitions using the <a href="https://build.fhir.org/ig/FHIR/sql-on-fhir-v2">SQL on FHIR v2</a> specification
          </div>
        </a>
        <v-btn dark color="#3F81AE" class="link-item text-decoration-none" href="Questionnaire/tester">
          <v-icon left> mdi-clipboard-text-outline </v-icon>
            form tester
        </v-btn>
        <a href="Questionnaire/tester" class="link-plain-text">
          <div>
            Test page for testing FHIR Questionnaires using the <a href="https://build.fhir.org/ig/HL7/sdc">SDC</a> specification
          </div>
        </a>
      </div>
      <br />
      <p>
        The Expression Sources menu provides access to existing resources containing expressions (from the fhir server
        configured in settings) and then navigate to the tester to debug the expression with existing test data
        (defaulting test resource ID "example")
      </p>
      <p>
        <b>Note:</b> As the .net, java, python and closure fhirpath engines don't run in the browser this data is sent to a cloud
        service to process these requests. None of this data is persisted outside the call itself.
        <v-alert outlined border="left" type="error">
          <b>Test Server:</b> This is an open testing server and should not be used with/for production data.<br/>
          Using individually identifiable data with this test utility is prohibited.<br/>
          Externally hosted services are indicated with a <v-icon small>mdi-web</v-icon> icon, do not select these if you do not want to use those services.
        </v-alert>
        These are the versions of each of the fhirpath engines in use:
      </p>
      <ul style="padding-left: 40px">
        <li>Firely SDK FHIRPath Engine v5.11.4 <i>(server side)</i></li>
        <li>FHIRPath.js v{{ fhirpathVersion }}</li>
        <li>HAPI FHIRPath v6.5.20 <i>(server side)</i></li>
        <li>IBM FHIRPath v4.11.1 (LinuxForHealth)<i> (server side)</i></li>
        <li>Dotnet FHIRMappingLanguage Engine v5.10.0<i> (server side)</i></li>
        <li>FHIRPath-py <i>(server side - externally hosted by Beda Software)</i></li>
        <li>Aidbox FHIRPath Engine (Health Samurai)<i> (server side - externally hosted by Health Samurai)</i></li>
      </ul>
      <br />
      <h5>Disclaimers:</h5>
      <p>
        Written by Brian Postlethwaite to support the FHIR community and is provided AS-IS<br />
        HL7®, FHIR® and the FHIR Mark® are trademarks owned by Health Level Seven International, registered with the
        United States Patent and Trademark Office.
      </p>
      <hr />
      <div class="extra-links">
        <div>
          <h5>Specifications</h5>
          <a href="https://hl7.org/fhirpath/" target="_blank">FHIRPath</a><br />
          <a href="https://hl7.org/fhir/fhirpath.html" target="_blank">FHIRPath FHIR extensions</a><br />
          <a href="https://hl7.org/fhir/R4" target="_blank">FHIR (R4)</a> <a href="https://hl7.org/fhir/R5" target="_blank">(R5)</a><br />
          <a href="https://hl7.org/fhir/mapping-language.html" target="_blank">FHIR Mapping Language</a>
        </div>
        <div>
          <h5>Community</h5>
          <a href="https://chat.fhir.org/#narrow/stream/179266-fhirpath" target="_blank">FHIRPath chat</a><br />
          <a href="https://chat.fhir.org/#narrow/stream/179298-fhirpath.2Ejs" target="_blank">FHIRPath.js chat</a><br />
          <a href="https://chat.fhir.org/#narrow/stream/179171-dotnet" target="_blank">FHIR with .net chat</a><br />
          <a href="https://chat.fhir.org/#narrow/stream/379173-FHIR-Mapping-Language" target="_blank">FHIR Mapping Language chat</a>
        </div>
        <div>
          <h5>Source Code</h5>
          <a href="https://github.com/brianpos/fhirpath-lab" target="_blank">fhirpath-lab</a><br />
          <a href="https://github.com/HL7/fhirpath.js" target="_blank">fhirpath.js</a><br />
          <a href="https://github.com/FirelyTeam/firely-net-common/tree/develop/src/Hl7.FhirPath" target="_blank">FirelySDK fhirpath (.net)</a><br />
          <a href="https://github.com/beda-software/fhirpath-py" target="_blank">fhirpath-py</a>
        </div>
      </div>
      <br/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-grid {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  gap: 12px 24px;
  grid-auto-flow: dense;
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
import Vue from "vue";
import fhirpath from "fhirpath";

export default Vue.extend({
  computed: {
    fhirpathVersion() {
      return fhirpath.version;
    },
  },
});
</script>
