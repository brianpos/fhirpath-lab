<template>
  <div>
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px">
      <div class="home-grid">
        <div class="logo grid-span-2">
          <img src="fhir-lab-ico-300x300.png" /><br />
          <span>Managing FHIRPATH Expressions</span>
        </div>
        <a class="link-item" href="FhirPath"
          ><div style="font-weight: 600">Tester</div></a
        >
        <a href="FhirPath"
          ><div>
            Quick Test page for testing any FHIRPath expressions
          </div></a
        >
        <a class="link-item" href="Library"
          ><div style="font-weight: 600">Library</div></a
        >
        <a href="Library"
          ><div>
            FHIRPath expressions and contexts used in form definitions to
            maintain the logic more easily
          </div></a
        >
        <a class="link-item" href="StructureDefinition"
          ><div style="font-weight: 600">Structure Definition</div></a
        >
        <a href="StructureDefinition"
          ><div>
            Supported FHIR Profile definitions (excluding core FHIR profiles).
            including resource and extension definitions
          </div></a
        >
        <a class="link-item" href="SearchParameter"
          ><div style="font-weight: 600">Search Parameter</div></a
        >
        <a href="SearchParameter"
          ><div>
            Definition of a search parameter including the fhirpath expression for its evaluation
          </div></a
        >
        <a class="link-item" href="Questionnaire"
          ><div style="font-weight: 600">Questionnaire</div></a
        >
        <a href="Questionnaire"><div>Form Definitions</div></a>
        <a class="link-item" href="List"
          ><div style="font-weight: 600">List</div></a
        >
        <a href="List"
          ><div>
            A simple collection of items of any type above - used in collecting your favourites
          </div></a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-grid {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto 1fr;
  gap: 12px 24px;
  grid-auto-flow: dense;
}


.grid-span-2 {
  grid-column: span 2;
}

.link-item {
  justify-self: right;
}

.logo {
  vertical-align: middle;
  justify-self: center;
  grid-row: span 6;
    grid-column: 3/5;
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

a {
  text-decoration: initial;
  color: initial;
}
</style>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
