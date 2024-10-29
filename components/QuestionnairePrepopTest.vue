<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <div style="flex-grow: 0; flex-shrink: 0;">

      <template v-if="isIPSPrepopulate">
        <v-text-field label="IPS Address" v-model="ipsBundleAddress">
          <template v-slot:append>
            <v-btn icon small tile @click="ipsBundleAddress = ''">
              <v-icon> mdi-close </v-icon>
            </v-btn>
            <v-btn icon small tile>
              <v-icon> mdi-download </v-icon>
            </v-btn>
            <v-btn small icon tile><v-icon title="Re-format the json below" dark>
                mdi-format-indent-increase
              </v-icon></v-btn>
          </template>
        </v-text-field>
        <v-textarea label="Smart Health Link (IPS)" :rows="5" v-model="smartHealthLink">
          <template v-slot:append>
            <v-btn icon small tile @click="smartHealthLink = ''">
              <v-icon> mdi-close </v-icon>
            </v-btn>
            <v-btn icon small tile>
              <v-icon> mdi-download </v-icon>
            </v-btn>
            <v-btn small icon tile><v-icon title="Re-format the json below" dark>
                mdi-format-indent-increase
              </v-icon></v-btn>
          </template>
        </v-textarea>
      </template>

      <v-select label="Pre-Processing Engine" class="engineSelector" :items="executionEngines" v-model="selectedEngine"
        hide-details="auto">
        <template v-slot:append-outer>
          <v-btn :loading="extractingInProgress" accesskey="g" style="margin-top: -8px;" title="press alt+g to go"
            @click="runPrePopulation" color="primary">
            <v-icon>
              mdi-play
            </v-icon> Populate
          </v-btn>
        </template>
      </v-select>

      <v-text-field label="Populate Service URL" v-model="populateServiceUrl" v-if="selectedEngine == 'Other pre-pop'">
      </v-text-field>

    </div>
    <resource-editor style="flex-grow: 1;" :readOnly="true" textLabel="$populate parameters (debug)"
      :resourceText="JSON.stringify(prepopParameters, null, 2)" />
  </div>
</template>

<style lang="scss" scoped>
.bare-label {
  transform-origin: top left;
  transform: scale(0.75);
  margin-top: 8px;
  height: 20px;
}

.ace_editor:focus-within+.ace_editor_footer {
  color: #1976d2;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>

<script lang="ts">
import { Questionnaire, QuestionnaireResponse, Parameters, Resource, ParametersParameter, FhirResource, BundleEntry, Bundle, Encounter, OperationOutcome } from "fhir/r4b";
import { Questionnaire as QuestionnaireR4, Patient as PatientR4, Practitioner as PractitionerR4, Encounter as EncounterR4 } from "fhir/r4";
import { Component, Prop, Vue } from "vue-property-decorator";

import { structuredDataCapture } from "fhir-sdc-helpers"
import { getExtension, getExtensionCodeValue, getExtensionCodingValue, getExtensionExpressionValues, getExtensions, getExtensionStringValue } from "fhir-extension-helpers"
import { CreateOperationOutcome, errorCodingSearch, requestFhirAcceptHeaders, requestFhirContentTypeHeaders } from "~/helpers/searchFhir";
import { FetchResourceCallback, populateQuestionnaire } from "@aehrc/sdc-populate";
import axios, { AxiosError } from "axios";
import QuestionnaireContext, { ContextData } from "./QuestionnaireContext.vue";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";

interface LaunchContextData {
  id: string | undefined;
  data: string | undefined;
  resourceType: string | undefined;
  loading?: boolean;
}

@Component
export default class QuestionnairePrepopulateTest extends Vue {

  // Properties provided by the parent component
  @Prop() readonly questionnaire: Questionnaire | undefined;
  @Prop() readonly context: ContextData | undefined;
  @Prop({ default: '' }) readonly dataServer!: string;

  // Properties visible to the local template
  public ipsBundleAddress: string = 'https://hapi.fhir.org/baseR4/Patient/1221256/$summary';
  public smartHealthLink: string = 'https://shlink.ips.health/ips#shlink:/eyJ1cmwiOiJodHRwczovL2FwaS52YXh4LmxpbmsvYXBpL3NobC8wMTNxS1YwZWRQWTdyVWNZYWpEa0V1ejZ0eGJ3WGs1Ums0N2tHanZrS1NBIiwiZmxhZyI6IiIsImtleSI6Ijh0bXpKQ0tvdDVKSHd2dmVNTzBsWmNJaXRGY3NpRmdzVWxFYTltVGN6TDgiLCJsYWJlbCI6IlNITCBmcm9tIDIwMjMtMDgtMjkifQ';
  public executionEngines: string[] = [
    "forms-lab",
    "CSIRO pre-pop",
    "lforms pre-pop",
    "Other pre-pop",
  ];
  public selectedEngine: string = "forms-lab";
  public populateServiceUrl: string = "http://localhost:8000/Questionnaire/$populate";
  public prepopParameters: Parameters = { resourceType: "Parameters", parameter: [] };
  public extractingInProgress: boolean = false;
  public downloadingFile: boolean = false;
  private outcome: OperationOutcome = { resourceType: "OperationOutcome", issue: [] };

  public get isIPSPrepopulate(): boolean {
    let isIPS = this.launchContexts?.find((lc) => lc.name === 'ips') !== undefined;
    return isIPS;
  }

  async public RunPrePopulation(engine: string): Promise<void> {
    if (this.executionEngines.includes(engine)) {
      this.selectedEngine = engine;
      await this.runPrePopulation();
    }
    else {
      this.outcome = CreateOperationOutcome("fatal", "exception", "Unknown pre-population engine selected: " + engine, errorCodingSearch);
      this.$emit('outcome', this.outcome);
    }
  }
  public get launchContexts() {
    return getExtensions(this.questionnaire, structuredDataCapture.exturl_LaunchContextExtension)?.map((lc) => {
      return {
        name: getExtensionCodingValue(lc, "name")?.code ?? getExtension(lc, "name")?.valueId ?? '',
        type: getExtensionCodeValue(lc, "type"),
        description: getExtensionStringValue(lc, "description"),
      }
    });
  }

  /** Perform a FHIR Search operation */
  async performXFhirQuery(url: string, mapData: (resultResource: FhirResource) => void, bundleBody?: Bundle) {
    try {
      if (!bundleBody) {
        let headers = { "Accept": requestFhirAcceptHeaders };
        const response = await axios.get<FhirResource>(url, {
          headers: headers
        });

        const results = response.data;
        if (results) {
          mapData(results);
        }
      } else {
        let headers = { "Accept": requestFhirAcceptHeaders, "Content-Type": requestFhirContentTypeHeaders };
        const response = await axios.post<FhirResource>(url, bundleBody, {
          headers: headers
        });

        const results = response.data;
        if (results) {
          mapData(results);
        }
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<fhir4b.OperationOutcome>;
        if (serverError && serverError.response) {
          if (serverError.response.status === 404) {
            return CreateOperationOutcome("error", "not-found", "Resource " + url + " not found", errorCodingSearch, url);
          }
          if (serverError.response.status === 401) {
            return CreateOperationOutcome("fatal", "forbidden", "Resource " + url + " not authorized", errorCodingSearch, url);
          }
          if (serverError.response.status === 410) {
            return CreateOperationOutcome("error", "not-found", "Resource " + url + " was deleted", errorCodingSearch, url);
          }
          return serverError.response.data;
        }
        return CreateOperationOutcome("fatal", "exception", "Server: " + err.message, errorCodingSearch, url);
      }
      return CreateOperationOutcome("fatal", "exception", "Client: " + err as string, errorCodingSearch, url);
    }
  }


  public async runPrePopulation() {
    // Run the pre-population based on the selected engine
    console.log('Running pre-population');
    this.extractingInProgress = true;
    let result: QuestionnaireResponse | undefined = undefined;
    if (this.selectedEngine === 'forms-lab') {
      result = await this.runFormsLabPrePopulation();
    } else if (this.selectedEngine === 'CSIRO pre-pop') {
      result = await this.runCSIROPrePopulation();
    } else if (this.selectedEngine === 'lforms pre-pop') {
      result = await this.runLFormsPrePopulation();
    } else if (this.selectedEngine === 'Other pre-pop') {
      result = await this.runOtherPrePopulation();
    } else {
      console.error('Unknown engine selected');
    }
    if (result) {
      console.log('Pre-population result', result);
      this.$emit('response', result);
    }
    this.extractingInProgress = false;
  }

  async runFormsLabPrePopulation(): Promise<QuestionnaireResponse | undefined> {
    console.log('Running forms-lab');

    return await this.evaluatePrePopulation("https://fhir.forms-lab.com/Questionnaire/$populate");
  }

  // Note: No way to POST batch bundles yet, the populate library will individually process each batch entry
  static fetchResourceCallbackCSIROPrePopulation: FetchResourceCallback =
    async (query: string, requestConfig: { sourceFhirServer: string }) => {
      let { sourceFhirServer } = requestConfig;

      const headers = {
        Accept: "application/json;charset=utf-8",
      };

      if (!sourceFhirServer.endsWith("/")) {
        sourceFhirServer += "/";
      }

      // When query is an absolute URL, use it as is
      if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(query)) {
        return axios.get(query, {
          headers: headers,
        });
      }

      // When query is a relative URL, append it to the client endpoint
      return axios.get(sourceFhirServer + query, {
        headers: headers,
      });
    };

  async runCSIROPrePopulation(): Promise<QuestionnaireResponse | undefined> {
    let patientResource: PatientR4 | undefined = undefined;
    let userResource: PractitionerR4 | undefined = undefined;
    let encounterResource: EncounterR4 | undefined = undefined;

    await this.preloadData();

    // read the variables from the parameters
    let context = this.prepopParameters.parameter?.filter(p => p.name === 'context');
    if (context) {
      for (let part of context) {
        let name = part.part?.find(p => p.name === 'name')?.valueString;
        let resource = part.part?.find(p => p.name === 'content')?.resource;
        if (name && resource) {
          switch (name) {
            case 'patient':
              patientResource = resource as PatientR4;
              break;
            case 'user':
              userResource = resource as PractitionerR4;
              break;
            case 'encounter':
              encounterResource = resource as EncounterR4;
              break;
          }
        }
      }
    }

    if (!this.questionnaire) {
      console.log("No patient resource provided");
      return;
    }

    if (!patientResource) {
      console.log("No patient resource provided");
      return;
    }

    const { populateSuccess, populateResult } = await populateQuestionnaire({
      questionnaire: this.questionnaire as QuestionnaireR4,
      fetchResourceCallback:
        QuestionnairePrepopulateTest.fetchResourceCallbackCSIROPrePopulation,
      requestConfig: {
        sourceFhirServer: this.dataServer,
      },
      patient: patientResource as PatientR4,
      user: userResource ? (userResource as PractitionerR4) : undefined,
      encounter: encounterResource ? (encounterResource as EncounterR4) : undefined,
    });

    if (!populateSuccess || !populateResult) {
      console.log("Failed to populate the questionnaire");
      return;
    }

    console.log("Populated response from CSIRO", populateResult.populatedResponse);
    this.$emit("response", populateResult.populatedResponse);

    return undefined;
  }

  async runLFormsPrePopulation(): Promise<QuestionnaireResponse | undefined> {
    console.log('Running lforms pre-pop');
    let subjectId = this.context?.subject?.reference;
    if (subjectId?.startsWith('Patient/'))
      subjectId = subjectId.substring('Patient/'.length);

    let authorId = this.context?.author?.reference;
    if (authorId?.startsWith('Practitioner/'))
      authorId = authorId.substring('Practitioner/'.length);

    this.$emit('pre-pop-lforms', this.dataServer, subjectId, authorId);
    return undefined;
  }

  async preloadData() {
    // load in the context data, and load any that have not already been loaded
    var environment: Record<string, any> = { resource: this.questionnaire, rootResource: this.questionnaire };
    this.outcome = { resourceType: "OperationOutcome", issue: [] };
    let lcs = this.launchContexts;
    if (lcs) {
      // iterate each launch context defined in the questionnaire
      for (let lc of lcs) {
        let data: LaunchContextData = { id: undefined, data: undefined, resourceType: lc.type };
        if (lc.type && lc.type !== 'Bundle')
          data.id = lc.type + '/example';
        if (this.context?.subject && lc.name === 'patient' && data.id != this.context.subject.reference) {
          data.id = this.context.subject.reference;
        }
        if (this.context?.author && lc.name === 'user' && data.id != this.context.author.reference) {
          data.id = this.context.author.reference;
        }
        if (this.context?.encounter && lc.name === 'encounter' && data.id != this.context.encounter.reference) {
          data.id = this.context.encounter.reference;
        }

        let context: ParametersParameter = {
          "name": "context",
          "part": [{
            "name": "name",
            "valueString": lc.name
          }]
        };
        this.prepopParameters.parameter!.push(context);
        if (data.id) {
          console.log("Loading context data for " + lc.name, data.id, "(" + lc.type + ")");
          let resourceUrl = data.id;
          environment[lc.name] = undefined;
          if (!resourceUrl.startsWith('http')) {
            resourceUrl = this.dataServer + '/' + resourceUrl;
          }
          const opOutcome = await this.performXFhirQuery(resourceUrl, (result) => {
            let contentResult = {
              name: "content",
              resource: result
            }
            environment[lc.name] = result;
            context.part!.push(contentResult);

            // if the reference display is different to the context display value, update it
            if (result && result.resourceType) {
              let display = result.id;
              if (result.resourceType === 'Patient') {
                display = QuestionnaireContext.getResourceReferenceDisplay(result);
              }
              if (result.resourceType === 'Practitioner') {
                display = QuestionnaireContext.getResourceReferenceDisplay(result);
              }
              if (result.resourceType === 'Encounter') {
                display = QuestionnaireContext.getResourceReferenceDisplay(result);
              }
              if (this.context?.subject && lc.name === 'patient' && display != this.context.subject.display) {
                this.context.subject.display = display;
              }
              if (this.context?.author && lc.name === 'user' && display != this.context.author.display) {
                this.context.author.display = display;
              }
              if (this.context?.encounter && lc.name === 'encounter' && display != this.context.encounter.display) {
                this.context.encounter.display = display;
              }
            }
          });
          if (opOutcome?.issue) {
            console.log("outcome ", opOutcome)
            this.outcome.issue!.push(...opOutcome.issue!);
          }
        }
      }
    }

    // load in any root level x-fhir-query expressions (which go into variables)
    const varExpressions = getExtensionExpressionValues(this.questionnaire, structuredDataCapture.exturl_Variable);
    if (varExpressions) {
      console.log("Variables", environment);
      for (let expr of varExpressions) {
        if (expr.expression && expr.language == 'application/x-fhir-query') {
          let query = this.replaceSearchTokens(expr.expression, environment);
          console.log("Evaluating expression: " + expr.name, query);

          // Add the variable to the pre-population parameters
          let context: ParametersParameter = {
            name: "context",
            part: [{
              name: "name",
              valueString: expr.name ?? ''
            }
            ]
          };

          // evaluate the expression
          if (!query.startsWith("http"))
            query = this.dataServer + "/" + query;
          const opOutcome = await this.performXFhirQuery(query, (result) => {
            let contentResult = {
              name: "content",
              resource: result
            }
            context.part!.push(contentResult);
          });
          if (opOutcome?.issue) {
            console.log("outcome ", opOutcome)
            this.outcome.issue!.push(...opOutcome.issue!);
          }

          this.prepopParameters.parameter!.push(context);
        }
      }
    }

    // load in any StructureMap query bundles
    const sourceQueriesReference = structuredDataCapture.getSourceQueriesExtension(this.questionnaire);
    if (sourceQueriesReference?.reference) {
      var searchBundleQueries = await this.extractSearchQueryBundle(sourceQueriesReference.reference);
      if (searchBundleQueries?.id) {
        // Scan all the requests and replace any tokens
        console.log("Raw Search Bundle ", JSON.stringify(searchBundleQueries, null, 2));
        if (searchBundleQueries.entry) {
          // Add the variable to the pre-population parameters
          let context: ParametersParameter = {
            name: "context",
            part: [{
              name: "name",
              valueString: searchBundleQueries.id
            }
            ]
          };

          // Patch all the requests
          for (let entry of searchBundleQueries.entry) {
            if (entry.request?.url) {
              console.log(searchBundleQueries.id + ": ", entry.request.method, entry.request.url);

              var patchedUrl = this.replaceSearchTokens(entry.request.url, environment);
              console.log("  patched to: " + patchedUrl);
              entry.request.url = patchedUrl;
            }
          }

          // Evaluate the search bundle
          console.log("Search Bundle to post", JSON.stringify(searchBundleQueries, null, 2));
          const opOutcome = await this.performXFhirQuery(this.dataServer, (result) => {
            if (searchBundleQueries?.id) {
              environment[searchBundleQueries.id] = result;
              this.prepopParameters.parameter!.push({ name: searchBundleQueries.id, resource: result });
              // Also scan the search bundle for any embedded OperationOutcomes
              if (result.resourceType === 'Bundle') {
                for (let entry of result.entry!) {
                  if (entry.resource?.resourceType === 'OperationOutcome') {
                    this.outcome.issue!.push(...entry.resource.issue!);
                  }
                }
              }
            }
          }, searchBundleQueries);
          if (opOutcome?.issue) {
            console.log("outcome ", opOutcome)
            this.outcome.issue!.push(...opOutcome.issue!);
          }
        }
      }
    }
    // exturl_SourceStructureMapExtension -- Nothing to do for this yet

    // Future: Perform any CQL preparations?
  }

  async extractSearchQueryBundle(searchBundleReference: string | undefined): Promise<Bundle | undefined> {
    if (!searchBundleReference || searchBundleReference.length == 0) return undefined;

    if (searchBundleReference.startsWith("#")) {
      // read the query from the contained resources
      let bundle = this.questionnaire?.contained?.find(c => c.id === searchBundleReference.substring(1));
      return bundle as Bundle;
    } else {
      // read the query from a server (assume the questionnaire server if relative)
      const outcome: OperationOutcome = CreateOperationOutcome("warning", "not-supported", "Client: Unable to retrieve search bundle " + searchBundleReference, errorCodingSearch);
      this.outcome.issue!.push(...outcome.issue!);
    }
  }

  replaceSearchTokens(queryText: string, envVars: Record<string, any>): string {
    var startTagIndex = queryText.indexOf("{{");
    if (startTagIndex > -1) {
      var endTagIndex = queryText.indexOf("}}", startTagIndex);
      if (endTagIndex > -1) {
        var expr = queryText.substr(startTagIndex + 2, endTagIndex - startTagIndex - 2);
        var result = fhirpath.evaluate({}, expr, envVars, fhirpath_r4_model);
        var tailSource = queryText.substr(endTagIndex + 2);
        var tailResult = this.replaceSearchTokens(tailSource, envVars);
        return queryText.substr(0, startTagIndex) + result + tailResult;
      }
    }
    return queryText;
  }

  async runOtherPrePopulation(): Promise<QuestionnaireResponse | undefined> {
    console.log('Running Other pre-pop: ' + this.populateServiceUrl);
    return await this.evaluatePrePopulation(this.populateServiceUrl);
  }

  async evaluatePrePopulation(url: string): Promise<QuestionnaireResponse | undefined> {
    this.$emit('outcome', undefined);

    try {
      // Reset the launch context parameters
      this.prepopParameters = {
        resourceType: "Parameters",
        "parameter": [
          {
            "name": "subject",
            "valueReference": {
              "display": "intake patient"
            }
          },
          {
            "name": "questionnaire",
            "resource": this.questionnaire
          }]
      };

      // Set the subject from the context
      this.prepopParameters.parameter![0].valueReference = this.context?.subject;

      await this.preloadData();
      // if (this.outcome.issue && this.outcome.issue.length > 0) {
      //   this.$emit('outcome', this.outcome);
      //   return;
      // }

      const bodyContent = JSON.stringify(this.prepopParameters, null, 4);

      // run the pre-population
      // Use the FHIR $populate operation to pre-populate the form
      // from whatever server is at the URL in populateServiceUrl 
      const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
        body: bodyContent
      });
      const raw = await response.text();
      console.log('Pre-population result', raw);

      var jsonOutput = JSON.parse(raw);
      if (jsonOutput.resourceType === "OperationOutcome") {
        console.log("Unable to pre-populate form, refer to outcome");
        this.outcome.issue!.push(...jsonOutput.issue!);
        this.$emit('outcome', this.outcome);
        return undefined;
      }

      if (jsonOutput.resourceType === "Parameters") {
        const result = jsonOutput as Parameters;
        const issuesParameter = result.parameter?.find(p => p.name === "issues");
        if (issuesParameter) {
          let issues = issuesParameter.resource as OperationOutcome;
          if (issues.issue)
            this.outcome.issue!.push(...issues.issue);
          this.$emit('outcome', this.outcome);
        }
        const returnParameter = result.parameter?.find(p => p.name === "return" || p.name === "response");
        if (returnParameter) {
          return returnParameter.resource as QuestionnaireResponse;
        }
        return undefined;
      }
      if (this.outcome.issue && this.outcome.issue.length > 0) {
        this.$emit('outcome', this.outcome);
      }
      if (jsonOutput.resourceType !== "QuestionnaireResponse") {
        console.log("Unexpected response type: " + jsonOutput.resourceType);
        return undefined;
      }

      return jsonOutput;
    }
    catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<fhir4b.OperationOutcome>;
        if (serverError && serverError.response) {
          let outcome: OperationOutcome;
          if (serverError.response.status === 404) {
            outcome = CreateOperationOutcome("error", "not-found", "Resource " + url + " not found", errorCodingSearch, url);
          }
          else if (serverError.response.status === 401) {
            outcome = CreateOperationOutcome("fatal", "forbidden", "Resource " + url + " not authorized", errorCodingSearch, url);
          }
          else if (serverError.response.status === 410) {
            outcome = CreateOperationOutcome("error", "not-found", "Resource " + url + " was deleted", errorCodingSearch, url);
          }
          else {
            outcome = serverError.response.data;
          }
          if (outcome?.issue)
            this.outcome.issue!.push(...outcome.issue!);
        }
        else {
          const outcome: OperationOutcome = CreateOperationOutcome("fatal", "exception", "Server: " + err.message, errorCodingSearch, url);
          this.outcome.issue!.push(...outcome.issue!);
        }
      }
      else {
        const outcome: OperationOutcome = CreateOperationOutcome("fatal", "exception", "Client: " + err as string, errorCodingSearch, url);
        this.outcome.issue!.push(...outcome.issue!);
      }
    }

    if (this.outcome.issue && this.outcome.issue.length > 0) {
      this.$emit('outcome', this.outcome);
      return;
    }
  }
}

</script>
