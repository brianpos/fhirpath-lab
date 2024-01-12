# fhirpath-lab change log
![](static/Square44x44Logo.scale-150.png "Fhirpath-lab logo")

> **Note:** The dates included here are the dates of the commits that were made to the repository. The actual release dates may be different.

## 12 January 2023 (dev)
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
