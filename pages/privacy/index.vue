<template>
  <div class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px">
      <br />
      <h5>Disclaimers:</h5>
      <p>
        Written by Brian Postlethwaite to support the FHIR community and is provided AS-IS.<br />
        This is not a Microsoft product, and does not come with any warranties explicit or implied.
      </p>
      <h5>Licensing:</h5>
      <p>
        This service and its <a href="https://github.com/brianpos/fhirpath-lab">source code</a> are provided under the
        BSD 3 Clause License.
      </p>
      <h5>Privacy Policy:</h5>
      <p>
        <b>Data we collect:</b> We only collect simple usage data to help improve the service.
        The actual data used in the test utility is not stored or tracked.<br />
        Data that the user explicitly enters into the SearchParameter/StructureDefinition and Library
        areas are stored either in our service, or on the server specified by you in the settings tab.
      </p>
      <p>
        <b>Data usage:</b> The usage data that we collect may be shared in aggregate form to
        provide usage information as to what parts of the system are used, and types of evaluations
        tested. (e.g. % usage of expressions with each of the fhirpath engines included).<br />
        The terminology server and data server specified in the settings will be used to retrieve
        fhir expression sources: Such as StructureDefinition and SearchParameters.
        <br/>
        If downloading example resources from HL7.org or build.fhir.org the data will be retrieved
        through a proxy built into the service to provide CORS services for this application.
      </p>
      <p>
        <b>Service location:</b> The service and all components used in its operation run on
        Microsoft Azure Cloud infrastructure in Australia.
      </p>

      <h5>3rd Party Hosted Services:</h5>
      <p>
        Features that use these 3rd party services are indicated using the <v-icon small>mdi-web</v-icon> icon.
        As these are not under the control of this service, only use them if you are comfortable with their privacy policies.<br/>
        These services may not always be available.
      </p>
      <div class="home-grid">
        <a class="link-item" target="_blank" href="https://www.health-samurai.io/aidbox">
          <div style="font-weight: 600">Health Samurai - Aidbox</div>
        </a>
        <div class="link-plain-text">
          Provides a Closure based FhirPath Engine inside their fhir services.
          Contact Health Samurai for further information.<br/>
        </div>

        <a class="link-item" target="_blank" href="https://beda.software/products">
          <div style="font-weight: 600">Beda Software</div>
        </a>
        <div class="link-plain-text">
          Provides an open source Python implementation of a FHIRPath engine.
          Contact Beda Software for further information.<br/>
          https://github.com/beda-software/fhirpath-py
        </div>
      </div>
      <br/>

      <h5>3rd Party Tools and Technologies:</h5>
      <div class="home-grid">
        <a class="link-item" target="_blank" href="https://github.com/FirelyTeam/firely-net-sdk">
          <div style="font-weight: 600">Firely SDK</div>
        </a>
        <div class="link-plain-text">
          .NET based fhirpath engine. Licensed under a BSD 3 Clause license.
        </div>

        <a class="link-item" target="_blank" href="https://github.com/HL7/fhirpath.js">
          <div style="font-weight: 600">HL7 fhirpath.js</div>
        </a>
        <div class="link-plain-text">
          Javascript based fhirpath engine. Developed as a joint project between the U.S. National Library of Medicine
          (NLM) and Health Samurai, and was then donated to HL7. Licensed under a BSD 3 Clause license.
        </div>

        <a class="link-item" target="_blank"
          href="https://github.com/hapifhir/org.hl7.fhir.core/blob/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4/utils/FHIRPathEngine.java">
          <div style="font-weight: 600">HAPI FHIRPathEngine</div>
        </a>
        <div class="link-plain-text">
          JAVA based fhirpath engine. Licensed under a BSD 3 Clause license.
        </div>

        <a class="link-item" target="_blank" href="https://nuxtjs.org/">
          <div style="font-weight: 600">VueJS/Nuxt</div>
        </a>
        <div class="link-plain-text">
          VueJS/Nuxt UI Framework. MIT License
        </div>

        <a class="link-item" target="_blank" href="https://ace.c9.io/">
          <div style="font-weight: 600">ace</div>
        </a>
        <div class="link-plain-text">
          A web based JSON code editor for displaying the debug output, and edit the Resource
           JSON content.
        </div>
      </div>
      <br />
      <h5>Trademarks:</h5>
      <p>
        HL7®, FHIR® and the FHIR Mark® are trademarks owned by Health Level Seven International, registered with the
        United States Patent and Trademark Office.
      </p>
      <hr />
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

export default Vue.extend({});
</script>
