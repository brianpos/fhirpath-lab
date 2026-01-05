# fhirpath-lab change log
![](static/Square44x44Logo.scale-150.png "Fhirpath-lab logo")

> **Note:** The dates included here are the dates of the commits that were made to the repository. The actual release dates may be different.

# 5 January 2026
* Update CSIRO renderer (1.2.11) and template extraction (1.0.14) engines
* Update CSIRO renderer to use the terminology server URL from the settings page
* fhirpath tester page share link can now support using bookmarks to support much longer links
* Update axios dependency to 1.13.2

# 26 December 2025
* Updated the static config loading code to use async/await to ensure that the settings are fully loaded before being used.
(which helps support the migration over to Vue3/Nuxt3)

# 19 December 2025
* Update NLM Form renderer to 38.7.2

# 16 December 2025
* Fhirpath tester page now reports when CORS issues are encountered
* Update to the fhirpath.js 4.8.2 engine
* Lots of progress with the Vue3 project, specifically the fhirpath page - trying out a multi-server results tab to run all in parallel.

# 21 November 2025
* Update to fhirpath.js version 4.7.0 (which has debugger support, and position information in the AST)
* Add initial support for the debugger in the fhirpath.js engine!
* Refactor the fhirpath.js to use the same code for all versions
* FML validator update with latest tweaks to the antlr grammar that has support for the latest fhirpath and fml engines.
* FML debug POC work (walking the trace lines)

# 30 September 2025
* POC support for XML in the fhirpath.js engine (when using actual FHIR content)

# 24 September 2025
* Refactor all the code to include new engines to make it easier to add new engines in future
* New FHIRPath engines:
  * OctoFHIR (Rust implementation - R4/R5/R6)
  * AtomicEHR (Typescript implementation - R4/R5/R6) - Health Samurai

# 9 September 2025
* Milestone release to prod
* Debugger trace support for HAPI/Firely engines
* FHIR version selector separately selectable from the engine selector
* partial XML support for fhirpath tests (if engine supports it)
* FHIR R6-ballot 3 support 
* Helios FHIRPath engine
* Lots of minor functionality improvements and bug fixes

# 30 August 2025 (dev)
* XML test resource support for fhirpath
  * tooltip for engines indicates if they support xml and json
  * test resource editor changes to XML mode if XML content is detected (checking first char is explicitly `<`)
  * passes XML content via the extension `http://fhir.forms-lab.com/StructureDefinition/xml-value` instead of `part.resource`
  * Download supports handling XML if returned by the server (use &_format=xml if needed)
  * reports an error if the selected engine doesn't support xml
  * test resource field label indicates which resource format was detected (default = json) 
  * property highlight selection able to handle xml test resources
* Download resource via ctrl+enter when in the test resource id field
* Include support for Firely's R6-ballot3 engine

# 28 August 2025 (dev)
* Add Helios Software fhirpath engine for R4B/R6

# 20 August 2025 (dev)
* refactor the engine selector to remove some of the old engine selector code that's no longer needed
* move the debugger controls into the header nav bar from the tab header (moving the other buttons is bad user experience)
* when debug stepping, don't auto swap tabs when in single pane mode

# 19 August 2025 (dev)
* Remove the IBM FHIRPath engine - is on an old version ( pre-move to Linux for health), so out of date already.

# 14 August 2025 (dev)
* Update NLM LHC-Forms to 38.2.0

# 8 August 2025 (dev)
* fhirpath debug tracer shows primitive values for properties along with the full path
* refactor the debug pane in the fhirpath test page to use the standard resource editor/viewer
* update the resource editor to use the <enter> key to download the resource, and also handle XML download better
* add the Python R5 engine
* split the fhirpath engine selector into 2 fields, one for the engine and one for the FHIR version
* add interim version of the fhirpath.js running on R6

# 1 August 2025 (dev)
* Fix issue where json path walker was not correctly handling the `BackboneElement` and `Element` types in the json parser
* Update the CSIRO renderer to 1.0.0-alpha.83
* When launching the fhirpath page with a resourceId parameter automatically load the resource content

# 29 July 2025 (dev)
* Preliminary support for R6 ballot3 (from JAVA engine only)
* fix target navigation to properties in contained resources

# 2 July 2025 (dev)
* Refinements to the debugger UI experience
* inclusion of the first pass fhirpath engine test results matrix page

# 12 June 2025 (dev)
* Update fhirpath.js fullPropertyName to resolve a couple of issues
* Update json parser to permit selection of root resource item

# 24 May 2025 (dev)
* Updated to fhirpath.js 4.3.0 (providing path information in the results and trace)
* Update to the latest sqlonfhir-v2 engine (v0.1.0-alpha.3)
* Update CSIRO renderer to 1.0.0-alpha.55
* Update NLM LForms renderer to 36.16.1

# 14 May 2025 (dev)
* Support for Matchbox server for FML testing!
* Update CSIRO renderer to 1.0.0-alpha.54
* Update to final version of Nuxt 2 - 2.18.1
* Update to Vuetify 1.12.3

# 10 May 2025 (dev)
* Include partial support for matchbox server for FML testing (still needs some work)

# 6 May 2025 (dev)
* Fix [#35](https://github.com/brianpos/fhirpath-lab/issues/35) ofType(Quantity).system.empty() with a non-empty system still returns true

# 2 May 2025 (dev)
* Update the CSIRO renderer to 1.0.0-alpha.53
* Update axios to 1.9.0

# 27 April 2025
* Include support for results and trace to include the navigation path to the raw resource content
* Update the fhirpath.js library to 4.0.0 (and several other packages)

# 21 January 2025
* Add exception checking when trying to write to the localstorage (discovered while parsing a HUGE json bundle)

# 20 January 2025
* Happy new year! - I'm back from holidays and have a few minor tweaks
* Debug output tab now doesn't popup in the questionnaire tester if there is only information messages
* Refinements to the styling of the debug output issues display (used in the questionnaire tester and elsewhere)

# 12 December 2024
* Add a `copy bundle to clipboard` button on the Extract test page (for David)

# 25 November 2024
* Update the extensions that indicate $extract support in the questionnaire tester

# 11 November 2024
* Include detecting the POC template extension `http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-extractToTemplate` as an indicator to display the extract tab in the questionnaire tester 
* Update the CSIRO renderer to 0.44.3
* Update the LForms renderer to 36.6.0
* Pre-pop toolbar button added (that doesn't switch tabs)
* resource editor tab consistency improvements
* Extract toolbar button added (that reads the renderer before switching tabs and extracting the data)

# 30 October 2024
* Resolved issue with inconsistent tabs in fhirpath code editors (to 4 space tabs) - thanks for reporting it Elliot.

# 28 October 2024
* Released to main
* Updated csiro renderer to 0.44.2
* Resolved bug with variable display in the fhirpath tester not refreshing when the variable was changed

# 22 October 2024 (dev)
* Extensive error handling improvements in the questionnaire tester pre-pop/context tabs
* Support search bundles in the questionnaire tester pre-pop tab

# 21 October 2024 (dev)
* Extensive work on the Context and pre-populate tabs in the questionnaire tester

# 16 October 2024 (dev)
* Enable save support for Questionnaires under very specific conditions (explicit matching publisher and resourceIds)

## 14 October 2024 (dev)
* Add the `context` tab to provide test data to the pre-populate and extract operations in the questionnaire tester.
  * Supports `subject` and `author` as parameters to the tester via the URL (If you want to include the display as well as the reference, put it after a comma in the URL parameter e.g. `subject=Patient/123,John Doe`) 
* Tidy up the tab numbering in the questionnaire tester so that it is selected by name rather than number (to easy maintenance)
* Update the old "pre-populate" tab to show the items (missed passing through the collection)

## 10 October 2024 (dev)
* Models tab in the form tester will auto-load any model query passed in the URL
* Extract tab layout cleaned up
* Support saving the QuestionnaireResponse in the form tester (after allocating an ID)
* Update the CSIRO renderer to v0.44.0

## 23 September 2024 (dev)
* Include a models tab on the form tester to permit providing model(s) to the $extract operation

## 22 September 2024 (dev)
* Correct the context/content parameters to the $extract operation in the questionnaire tester
* Capture and report pre-pop issues returned from $populate in the questionnaire tester

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
