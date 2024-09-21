# fhirpath-lab change log
![](static/Square44x44Logo.scale-150.png "Fhirpath-lab logo")

> **Note:** The dates included here are the dates of the commits that were made to the repository. The actual release dates may be different.

## 21 September 2024 (dev)
* Update form pre-pop tester to include other URL to evaluate the pre-pop against

## 19 September 2024 (dev)
* Update the CSIRO renderer to v0.40.1

## 18 September 2024 (dev)
* Update the CSIRO renderer to v0.40.0
* Enhance the POC $extract Questionnaire tester based on initial testing
* in the FML test page, show the output tab (if not already visible) after running the test
* questionnaire test page improved outcome issue handling for save/extract

## 12 September 2024 (dev)
* Update HealthSamurai Aidbox closure fhirpath engine description

## 19 August 2024 (dev)
* Update the fhirpath.js to v3.15.1
* Update the CSIRO renderer to v0.37.2
* Update new FML window prototype (at /fml)
* Update the TwinPaneTab control to try and be more consistent with the tab height sizing using flexbox
* Add the ResourceEditor control
* StructureDefinition page to use the new ResourceEditor
* No longer hide the AI Chat config controls behind "Say the magic word"

## 30 July 2024 (dev)
* Include the HealthSamurai Aidbox closure fhirpath engine
* Include the Beda Software Python fhirpath engine
* Include a simple FML validation based on a verified ANTLR grammar (work in progress)

## 18 June 2024
* Update the LForms renderer to 36.1.3
* Include the fhirpath expression in the Library search page row extension section

## 11 June 2024
* Include a POC of the $extract Questionnaire tester

## 8 June 2024
* Update the Ace editor to the 1.34.2/0.0.48
* Update the CSIRO pre-pop to 2.2.0
* Update the CSIRO renderer to 0.35.0
* Update axios to 1.7.2 (rectifying some security vulnerabilities)
* remove bootstrap-vue
* Update marked to 11.0.0
* Remove use of the EasyTable component (converted to Vuetify datatable) 

## 13 May 2024
* Include nav shortcuts from the fields, variables, behaviors and pre-pop sections in the questionnaire tester page

## 11 May 2024
* Update the LForms renderer to 36.0.4

## 10 May 2024
* Resolve CSIRO renderer tracking linkId when tabs are in the form being rendered (Thanks Sean)
* Update the publishing tab on the Questionnaire test page to correctly link to the tester page
* resolve issue with JSON editors resizing correctly when the twintabpanel changes modes/tabs

## 9 May 2024
* Update the Questionnaire test page to select the tab(s) by name as well as index, and also support a `,` to select 2 tabs at once
* Update the Questionnaire search page to open the questionnaire tester tab rather than the ghost page from the forms-lab
* Improve reliability of the UseContexts search box on library and questionnaire resources (including some defaults)

## 6 May 2024
* Update landing page to indicate that 5.8.1 of the FirelySDK is now being used

## 4 May 2024
* Update to 36.0.3 of the NLM LForms
* Update to 0.25.2 of CSIRO's questionnaire renderer

## 3 May 2024
* Release dev version to production!
* Add new shortcut to test an expression using ctrl+enter in the fhirpath tester

## 1 May 2024 (dev)
* Preliminary work for displaying navigation markers from the AST to the actual expression in the FHIRPath tester (coming soon for dotnet)

## 20 April 2024 (dev)
* Updated to the public main branch of fhirpath.js (3.13.0) now that the defineVariable function is included in the main branch
* sharing Fhirpath AI chat via clipboard now includes the name of the model that a message is from
* Changed the npm package for accessing AI projects to the `openai@4.38.1` npm package

## 8 April 2024 (dev)
* Toggle single/dual pane view on the FHIRPath and Form Tester pages

## 3 April 2024 (dev)
* include the `defineVariable` function link to the docs in the AST
* while dynamically scanning the resource for used variables ensure than none defined using `defineVariable` are included in the list that the user should enter are included.

# 26 March 2024 (dev)
* Add ability to use the CSIRO renderer to navigate to an item in the questionnaire definition json tab

# 22 March 2024 (dev)
* Updated the fhirpath.js library to 3.10.4 (still with the prototype `withVariable()` function that is now called `defineVariable`)
* added some sample conversations that I've had with the Questionnaire AI (in the form of a chatbot) on the questionnaire test page
* AI Chat prompt refinements (and supporting jsonpatch markdown blocks)

# 19 March 2024 (dev)
* Refactored the twin pane tab control into the fhirpath and form tester pages
* Twin pane tab control now has the lock left/right buttons and auto tab switcher features

# 20 Feb 2024 (dev/prod) - from the dotnet server fhirpath tester
* dotnet tester now supports 3 custom functions - for helping with debugging
  - propname(): The name of the property that the current node is in (if it is a property and not the result of a calculation)
  - pathname(): The full simple path to the current node (if it is a property and not the result of a calculation)
  - shortpathname(): The same as pathname, but without indexers if the property is not natively a collection

# 25 January 2024 (dev)
* fixed issue with primitive extensions not selecting correctly in the context navigator
* Add brief highlight to the navigated node in the JSON when selecting from trace/error list

# 24 January 2024 (dev)
* Questionnaire test page added (with initial support for NLM lforms and CSIRO questionnaire renderers)
* FhirPath test page now has a link from the context header (in results and trace) to the raw JSON resource to ease navigation

## 12 January 2024 (dev)
* Update version of fhirpath.js included to 3.9.0 (with the prototype `withVariable()` function)
* Include links to the SDC extended functions

## 17 November 2023 (dev)
* IPS demo also has a validate questionnaire feature - using the forms-lab Q def validation service

## 2 November 2023 (dev)
* FHIR Map test page now uses the examples server address from the settings page
* The HAPI fhir map engine (hosted with the fhirpath-lab) is now available to test on the FHIR Map test page
* First draft of the sqlonfhir-v2 test page (has known issues) now available

## 12 October 2023 (dev)
* From the AST view provide hyperlinks to the fhirpath spec for functions (i.e. link `join` to the relevant bookmark in the spec)

## 25 September 2023
* Variables can be passed through the URL using the `?var-xxx=value` syntax to set a variable called `xxx` in an expression (and used `%xxx`)
* Fix bug with library resources saving/loading contained resources in the test resource
* Better handling of errors when loading/saving library resources from the server
* progress indicator when saving a library resource

## 7 September 2023
* Addition of the `Reset expression and context` button to the test page
* Removal of the Terminology Server URL from the resource page (still uses the value in the settings page)
* Add new settings URL for where to retrieve example resources from (changes default from sqlonfhir-r4 to the public HAPI demo server)
* Support creating and editing Library resources from the fhirpath expression test page
    * requires `Show Advanced Properties` and a `Default Provider Field` to be set in the settings page
