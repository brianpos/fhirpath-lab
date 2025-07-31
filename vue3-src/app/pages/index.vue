<!-- filepath: c:\git\Production\fhirpath-lab\vue3-src\pages\index.vue -->
<template>
  <div class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px">
      <br />
      <p class="leader">
        FHIRPath is heavily used in FHIR to define validations in <NuxtLink to="/StructureDefinition">profiles</NuxtLink>, properties
        to index in <NuxtLink to="/SearchParameter">search definitions</NuxtLink> and various features inside
        questionnaires. This fhirpath lab is an open source tool to simplify testing fhirpath
        expressions against the various open source fhirpath engines available.
      </p>
      <br />
      <div class="home-grid">
        <v-btn dark color="#3F81AE" class="link-item text-decoration-none" to="/FhirPath">
          <v-icon start> mdi-bug-outline </v-icon>
            Tester
        </v-btn>
        <NuxtLink to="/FhirPath" class="link-plain-text">
          <div>
            Quick Test page for testing any FHIRPath expressions
          </div>
        </NuxtLink>
        <!-- <v-btn dark color="#3F81AE" class="link-item text-decoration-none" to="/Library">
          <v-icon start> mdi-library-outline </v-icon>
            Library
        </v-btn>
        <NuxtLink to="/Library" class="link-plain-text">
          <div>
            A library of FHIRPath expressions for sharing between other resources, to
            maintain the logic more easily
          </div>
        </NuxtLink> -->
        <v-btn dark color="#3F81AE" class="link-item text-decoration-none" to="/fml">
          <v-icon start> mdi-chart-gantt </v-icon>
            Mapper
        </v-btn>
        <NuxtLink to="/fml" class="link-plain-text">
          <div>
            Test page for mapping to/from FHIR resources using the <a href="https://www.hl7.org/fhir/mapping-language.html">FHIR Mapping Language</a>
          </div>
        </NuxtLink>
        <v-btn dark color="#3F81AE" class="link-item text-decoration-none" to="/sqlonfhir">
          <v-icon start> mdi-database-search </v-icon>
            sql-on-fhir
        </v-btn>
        <NuxtLink to="/sqlonfhir" class="link-plain-text">
          <div>
            Test page for FHIR view definitions using the <a href="https://build.fhir.org/ig/FHIR/sql-on-fhir-v2">SQL on FHIR v2</a> specification
          </div>
        </NuxtLink>
        <v-btn dark color="#3F81AE" class="link-item text-decoration-none" to="/Questionnaire/tester">
          <v-icon start> mdi-clipboard-text-outline </v-icon>
            form tester
        </v-btn>
        <NuxtLink to="/Questionnaire/tester" class="link-plain-text">
          <div>
            Test page for testing FHIR Questionnaires using the <a href="https://build.fhir.org/ig/HL7/sdc">SDC</a> specification
          </div>
        </NuxtLink>
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
        <v-alert
          type="error"
          border="start"
          variant="outlined"
          icon="mdi-alert"
        >
          <b>Test Server:</b> This is an open testing server and should not be used with/for production data.<br/>
          Using individually identifiable data with this test utility is prohibited.<br/>
          Externally hosted services are indicated with a <v-icon size="small" color="grey-darken-1">mdi-web</v-icon> icon, do not select these if you do not want to use those services.
        </v-alert>
      </p>
      <p>
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
          <h5>Community <svg style="margin-bottom: -4px;" class="brand-logo" role="img" aria-label="Zulip" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" height="22.5">
                    <path fill="hsl(50%, 50%, 100%)" d="M 473.09 122.97 c 0 22.69 -10.19 42.85 -25.72 55.08 L 296.61 312.69 c -2.8 2.4 -6.44 -1.47 -4.42 -4.7 l 55.3 -110.72 c 1.55 -3.1 -0.46 -6.91 -3.64 -6.91 H 129.36 c -33.22 0 -60.4 -30.32 -60.4 -67.37 c 0 -37.06 27.18 -67.37 60.4 -67.37 h 283.33 c 33.22 -0.02 60.4 30.3 60.4 67.35 z M 129.36 506.05 h 283.33 c 33.22 0 60.4 -30.32 60.4 -67.37 c 0 -37.06 -27.18 -67.37 -60.4 -67.37 H 198.2 c -3.18 0 -5.19 -3.81 -3.64 -6.91 l 55.3 -110.72 c 2.02 -3.23 -1.62 -7.1 -4.42 -4.7 L 94.68 383.6 c -15.53 12.22 -25.72 32.39 -25.72 55.08 c 0 37.05 27.18 67.37 60.4 67.37 z"></path>
                </svg></h5>
          <a href="https://chat.fhir.org/#narrow/stream/179266-fhirpath" target="_blank">FHIRPath chat</a><br />
          <a href="https://chat.fhir.org/#narrow/stream/179298-fhirpath.2Ejs" target="_blank">FHIRPath.js chat</a><br />
          <a href="https://chat.fhir.org/#narrow/stream/179171-dotnet" target="_blank">FHIR with .net chat</a><br />
          <a href="https://chat.fhir.org/#narrow/stream/379173-FHIR-Mapping-Language" target="_blank">FHIR Mapping Language chat</a>
        </div>
        <div>
          <h5>Source Code <v-icon style="margin-bottom: 6px;" size="small">mdi-github</v-icon></h5>
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

<script setup lang="ts">
import { computed } from 'vue'
import fhirpath from 'fhirpath'

// Set the page title
useHead({
  title: 'FHIRPath Lab'
})

// Computed property for fhirpath version
const fhirpathVersion = computed(() => {
  return fhirpath.version
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

/* Bootstrap-like responsive container breakpoints */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}

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
  margin-bottom: 16px;
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

hr {
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
    margin-bottom: 1rem;
    margin-top: 1rem;
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