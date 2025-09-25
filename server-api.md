# fhirpath-lab server engine API
![](static/Square44x44Logo.scale-150.png "Fhirpath-lab logo")

Most fhirpath engines supported in the fhirpath-lab require server processing
to be able to evaluate expressions. This is due to either:

* Language/engine is not available, or impractical in the browser (e.g. .NET/JAVA)
* Hosting the service separates the engine maintenance from the fhirpath-lab itself (simplifying engine version management)

Currently the Firely SDK for .NET and the HAPI FHIR server/FHIR are run by Brian as a part of the fhirpath-lab's infrastructure, and several other engines are provided by other companies *(marked as such in the UI)*

### Features of the Server API
The server API is able to *(/expected to)* provide the following features in its results:
* The result(s) of the expression evaluation
  * The context that was used for each result (if a context expression was provided)
  * datatype of the each result
  * (optional) the simple path to the result *(if is directly referenceable from the resource, and is not a mutation)*
* The engine and version that performed the evaluation
* (recommended) Trace output from any trace calls in the expression
  * This is a collection of parts, with the name of each part being the datatype of the value traced
  * The value of each part being the value traced
  * The name of the trace call (as provided in the expression) being in the valueString property of the trace part
* (optional) The AST for the expression
  * This is a JSON representation of the Abstract Syntax Tree, which is useful for debugging
  * This can be a simplified version of the AST, as long as it shows the structure of the expression and uses the lab's definition (roughly based on the Firely AST)
  * (optional) can contain type information if available (HAPI and Firely do this via static analysis)
  * (optional) can contain position information where available, line, column and length, or position and length
  * You can put your own AST in the output also, which is then visible in the debug view.<br/>
    *(to view in the AST display in the lab this needs to be converted either server side or client side into the format used by the fhirpath-lab - see the fhirpath-lab source code for details - recommend doing server side...)*
* The debug trace output from the parser (if supported by the engine) - enables post-mortem debugging of expression evaluation
* CORS support for the fhirpath-lab domains
  * https://fhirpath-lab.com
  * https://dev.fhirpath-lab.com
  * http://localhost:3000 - *where I test locally to the services*

> **Note:** If you've got an implementation and want to see how others have already implemented the API, you can refer to the following github source for how the functionality was implemented in other engines:
> * [Firely SDK implementation](https://github.com/brianpos/fhirpath-lab-dotnet/blob/7768a68604fbe24311be0edabbcf6ac6434bc42b/fhirpath-lab-dotnet/FunctionFhirPathTest.cs#L70)
> * [HAPI FHIR implementation](https://github.com/brianpos/fhirpath-lab-java2/blob/main/src/main/java/com/fhirpathlab/FhirpathTestController.java#L86)
> * [fhirpath.js implementation](https://github.com/brianpos/fhirpath-lab-fhirpath-js-api/blob/main/src/fhirpath-service.ts) *node js hosting - though in the live service is embedded in the page via npm package*

### Registering a new Engine
To add in another engine into the fhirpath-lab, the VueJS code will need to be updated to include the new engine:
*(this has recently been significantly simplified)*
* static/config.json - Add in the new service URL
* static/config.local.json - Add in the new service URL (for local debugging only)
* types/fhirpath_test_engine.ts - Add in the new engine details (match the config.json key)


## API Definition
The API takes a FHIR Parameters resource as the input, and returns a FHIR Parameters resource as the output (unless a critical failure occurs, where OperationOutcome is returned - non-critical failures can be reported inside the output parameters).

### Input Parameters Resource:
| Parameter Name | Description | Type | Cardinality |
|----------------|-------------|------|:-----------:|
| `context` | The context to execute the expression against | string | 0..1 |
| `expression` | The fhirpath expression to execute | string | 1..1 |
| `variables` | The variables to pass to the expression | multi-part | 0..* |
| *(variables.part.name)* | The name of a variable to use | string | 1..1 | 
| *(variables.part.value)* | The value of the variable| *(any)* | 0..1 | 
| `resource` | The resource to execute the expression against | Resource or Extension | 1..1 |
| `terminologyserver` | The terminology server to use for terminology lookups if not natively supported | string | 0..1 |

The `resource` parameter can also be an extension, in which case the value of the extension is the xml or json representation of the resource:
* http://fhir.forms-lab.com/StructureDefinition/xml-value
* or http://fhir.forms-lab.com/StructureDefinition/json-value

> **Note:** The parameters sent to the server will always be `json`, so to support XML inputs, the XML will need to be embedded in the string extension described above.
Some server engines (like the HAPI one) only handle FHIR R4 input parameters, hence any non R4 resources need to be sent in the extension (rather than as a resource property).
(If your engine is the same, there's the `encodeResourceJsonAsExtension` flag to set in the `fhirpath_test_engine.ts` file to indicate this).

### Evaluation Notes

If a `context` expression is provided, the engine should evaluate the context expression against the test resource, and then run the test `expression` against each item returned. In this case the `%context` variable should be set for each item returned by the context expression, and set `%resource` and `%rootResource` to the test resource.

When no `context` is provided, just evaluate the test `expression` directly on the input test resource.
For these evaluations, `%context`, `%resource` and `%rootResource` should all be set to the test resource.


### Output Parameters Resource:
| Parameter Name | Description | Type | Cardinality |
|----------------|-------------|------|:-----------:|
| `parameters` | The parameters that were passed in - detailed below | multi-part | 1..1 |
| `result` | Contains the results of evaluating the FHIRPath expression, with separate result parameters for each context item when a context expression is provided. Each result parameter includes both the expression results and any trace data from `trace()` function calls.<br/> The `valueString` describes the context value the results apply to (e.g., "Patient.name[0]"). | multi-part | 0..* |
| `debug-trace` | (optional) Step-by-step debug trace information <br/>Each debug step contains expression position, context, and current variable values<br/>*As with the result parameter, the debug-trace parameter will repeat for each context and use `valueString` to describe the context.* | multi-part | 0..* |

#### Output Parameters Resource: `parameters` Part
These parameters are what was passed into the engine, along with some additional information about the evaluation. Useful for debugging and understanding what was executed.

| Part Name | Description | Type | Cardinality |
|-----------|-------------|------|:-----------:|
| evaluator | The name (and version) of the engine performing the evaluation<br/>This should include the engine name, engine version, and fhir version (in brackets) and should be as concise as possible<br/>e.g. `Java 6.6.5 (R6)` | string | 1..1 |
| parseDebugTree | The debug output from the parser as a JSON tree (Abstract Syntax Tree)<br/>*This is JSON embedded in the string, defined below* | string | 0..1 |
| expression | The expression that was executed | string | 1..1 |
| context | The context that was used to execute the expression | string | 0..1 |
| resource | The resource that was used to execute the expression | Resource or extension | 1..1 |
| variables | The variables that were passed to the expression | multi-part | 0..* |
| expectedReturnType | (very optional) The expected return type of the expression (via static analysis) | string | 0..1 |
| parseDebug | (very optional) The debug output from the parser (unformatted - just messages for debugging) | string | 0..1 |
> **Note:** you can add any other parts here you want to help with debugging - just make sure the name is unique and doesn't clash with the above names. e.g. The HAPI engine includes it's internal AST in `parseDebugTreeJava` which can help if you need to diagnose the parsing, and mapping into the Lab's AST format.

##### Example `parameters` part extract:
```json
"parameter": [
  {
    "name": "parameters",
    "part": [
      {
        "name": "evaluator",
        "valueString": "Java 6.6.5 (R4B)"
      },
      ...
```

#### Output Parameters Resource: `result` Part
Each `result` parameter contains the evaluation results for one context item (or for the entire resource if no context expression was provided). Each result parameter includes both the expression result(s) and any trace data from `trace()` function calls.

_Context Identification:_
- When a context expression is provided, each `result` parameter includes a `valueString` that identifies which context item the results apply to
- When no context expression is provided, the `valueString` is omitted since results apply to the entire resource

_Context Description Format:_<br/>
The `valueString` can use either approach:
* **Simply append an index**: Append numeric indices to the context expression<br/>
  Examples: `name[0]`, `name[1]`, `name.where(use='official')[0]`
* **Full path as evaluated**: Use complete element paths within the resource<br/>
  Examples: `Patient.name[0]`, `Patient.address[1]`, `Patient.contact[0].name`

There can be multiple *Result* type parts in each `result` part, depending on the expression evaluation, and can also include multiple *Trace* type parts too, for different traced values.
| Output Type | Part Property | Description | Type | Cardinality |
|--------|-----------|-------------|------|:-----------:|
| *Result*  | name = '*datatype*' | (recommended) The datatype of the result - this could be a primitive type, resource type, or complex type. e.g. 'string', 'Patient', 'HumanName' etc, backbone elements should produce some composite value to indicate what they are, e.g. `` *(not Backbone)*<br/>*(cannot be `trace`, as that indicates a trace result)*  | string | 0..1 |
| *Result*  | name = 'empty-string' | The evaluation of the result produced an empty string value - implies that the datatype is `string`.<br/>*This is required as many serialization engines will remove empty values from the resource results*  | string | 0..1 |
| *Result*  | value[x] | Actual value of the result, in the appropriate value[x] property,<br/>Use the appropriate FHIR type that is supported in the property.part.value, eg valueHumanName, valueInteger, resource, etc. If the type is not supported there, use the json-value extension to provide the data (non fhir data, backbone elements etc.) | Any | 0..1 |
| *Result* | extension | http://fhir.forms-lab.com/StructureDefinition/resource-path<br/>Is used to report the resource path for the result | string | 0..1 |
| *Result* | extension | http://fhir.forms-lab.com/StructureDefinition/json-value<br/>Is used to represent types that are not supported in `parameters.value[x]` | string | 0..1 |
|-|-|-|-|-|
| *Trace* | name = 'trace' | Fixed string value `trace` to indicate that this parameter part contains trace data. | string | 1..1 |
| *Trace* | valueString | The name provided to the trace() function call in the expression (e.g. 'trc') | string | 1..1 |
| *Trace* | part | The set of values returned by the trace() function call | multi-part | 0..* |
| *Trace*  | part.name = '*datatype*' | (recommended) The datatype of the traced result value - *same as in Result*  | string | 0..1 |
| *Trace*  | part.value[x] | Actual value of the trace result, in the appropriate value[x] property.<br/>*Use appropriate value type - same as in Result* | Any | 0..1 |
| *Trace* | part.extension | http://fhir.forms-lab.com/StructureDefinition/resource-path<br/>Is used to report the resource path for the trace result | string | 0..1 |
| *Trace* | part.extension | http://fhir.forms-lab.com/StructureDefinition/json-value<br/>Is used to represent types that are not supported in `parameters.value[x]` | string | 0..1 |

##### Example `result` part extract:
Example context: `name`<br/>
Example request: `given.trace('trc', first()).join(' ')`
```json
{
  "name": "result",
  "valueString": "Patient.name[0]",
  "part": [
    {
      "name": "str",
      "valueString": "\"Peter James\""
    },
    {
      "name": "trace",
      "valueString": "trc",
      "part": [
        {
          "extension": [
            {
              "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
              "valueString": "Patient.name[0].given[0]"
            }
          ],
          "name": "string",
          "valueString": "Peter"
        },
        {
          "extension": [
            {
              "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
              "valueString": "Patient.name[0].given[1]"
            }
          ],
          "name": "string",
          "valueString": "James"
        }
      ]
    }
  ]
},
```
Each result from the evaluation of the context expression will be a separate `result` part in the output parameters, e.g. for `Patient.name[1]`


> **Note:** if a value cannot be represented by a FHIR type in the parameters (such as backbone elements), then that output should be serialized into a JSON fragment and put into a string extension `http://fhir.forms-lab.com/StructureDefinition/json-value` on the part.
``` json
{
  "extension": [
    {
      "url": "http://fhir.forms-lab.com/StructureDefinition/json-value",
      "valueString": "{\r\n  \"relationship\": [\r\n    {\r\n      \"coding\": [\r\n        {\r\n          \"system\": \"http://terminology.hl7.org/CodeSystem/v2-0131\",\r\n          \"code\": \"N\"\r\n        }\r\n      ]\r\n    }\r\n  ],\r\n  \"name\": {\r\n    \"family\": \"du Marché\",\r\n    \"_family\": {\r\n      \"extension\": [\r\n        {\r\n          \"url\": \"http://hl7.org/fhir/StructureDefinition/humanname-own-prefix\",\r\n          \"valueString\": \"VV\"\r\n        }\r\n      ]\r\n    },\r\n    \"given\": [\r\n      \"Bénédicte\"\r\n    ]\r\n  },\r\n  \"telecom\": [\r\n    {\r\n      \"system\": \"phone\",\r\n      \"value\": \"+33 (237) 998327\"\r\n    }\r\n  ],\r\n  \"address\": {\r\n    \"use\": \"home\",\r\n    \"type\": \"both\",\r\n    \"line\": [\r\n      \"534 Erewhon St\"\r\n    ],\r\n    \"city\": \"PleasantVille\",\r\n    \"district\": \"Rainbow\",\r\n    \"state\": \"Vic\",\r\n    \"postalCode\": \"3999\",\r\n    \"period\": {\r\n      \"start\": \"1974-12-25\"\r\n    }\r\n  },\r\n  \"gender\": \"female\",\r\n  \"period\": {\r\n    \"start\": \"2012\"\r\n  }\r\n}\r\n"
    }
  ],
  "name": "Patient#Contact"
},
```


#### Output Parameters Resource: `debug-trace` Part
Each `debug-trace` parameter contains step-by-step execution information for debugging purposes. Each debug-trace parameter corresponds to one context item (or to the entire resource if no context expression was provided).

> **Note:** If you choose to implement debug-trace output, you can refer to the following github source for how the functionality was implemented in other engines, and also contains unit tests for the functionality:
> * PR (merged) to include support in the Firely SDK https://github.com/FirelyTeam/firely-net-sdk/pull/3210
>   * [Unit tests in the Firely SDK](https://github.com/FirelyTeam/firely-net-sdk/blob/develop/src/Hl7.FhirPath.R4.Tests/DebugTracerTests.cs)
> * PR  (merged) to include support in the HAPI FHIR engine https://github.com/hapifhir/org.hl7.fhir.core/pull/2054
> * PR (pending) to include support in the fhirpath.js engine https://github.com/HL7/fhirpath.js/pull/174
>
> *Refer to the latest code to ensure that any bug fixes for tests, or the implementation is covered - these PRs just highlight the appropriate code, and rough shape of their implementations.
> Some engines internally track position information differently, but need to be mapped into the position/length format for the UI to be able to display it correctly.*

**Context Identification:** *(same as result parameter)*
- When a context expression is provided, each `debug-trace` parameter includes a `valueString` that identifies which context item the debug information applies to
- When no context expression is provided, the `valueString` is omitted since debug information applies to the entire resource

Each debug step within the `part` collection represents an evaluation step in the FHIRPath expression:

| Output Type | Part Property | Description | Type | Cardinality |
|--------|-----------|-------------|------|:-----------:|
| *Debug Step* | name = `'{position},{length},{function}'` | The part name contains debug position information where:<br/>• `position` = character position in the original expression where this sub-expression starts<br/>• `length` = length of the sub-expression in characters<br/>• `function` = the FHIRPath function or operation being evaluated (e.g., "trace", "constant", "given") | string | 1..1 |
| *Debug Step* | part | Collection of debug information for this evaluation step | multi-part | 1..* |
|-|-|-|-|-|
| **Debug Step Sub-Parts:** | | | | |
| *Step Results* | part.name = `'{datatype}'` | The evaluated result of this debug step with the datatype as the name | string | 0..* |
| *Step Results* | part.value[x] | The actual result value in the appropriate value[x] property | *(any)* | 0..1 |
| *Step Results* | part.extension | http://fhir.forms-lab.com/StructureDefinition/resource-path<br/>Path to the element in the resource where this result originates | string | 0..1 |
| *Step Results* | part.extension | http://fhir.forms-lab.com/StructureDefinition/json-value<br/>JSON representation for values that cannot be represented as standard FHIR types | string | 0..1 |
| *General Resource Path* | part.name = `'resource-path'` | General resource path reference for this debug step | string | 0..1 |
| *General Resource Path* | part.valueString | The resource path (e.g., "Patient.name[0]") | string | 1..1 |
| *Focus Context Path* | part.name = `'focus-resource-path'` | Path identifying the current focus context location | string | 0..1 |
| *Focus Context Path* | part.valueString | The focus context path | string | 1..1 |
| *Focus Values* | part.name = `'focus-{datatype}'` | Focus variable values with their specific datatype | string | 0..* |
| *Focus Values* | part.value[x] | The value of the focus variable | *(any)* | 0..1 |
| *Focus Values* | part.extension | http://fhir.forms-lab.com/StructureDefinition/resource-path<br/>Path to the focus element in the resource | string | 0..1 |
| *This Context Path* | part.name = `'this-resource-path'` | Path identifying the current `$this` context location | string | 0..1 |
| *This Context Path* | part.valueString | The `$this` context path | string | 1..1 |
| *This Values* | part.name = `'this-{datatype}'` | Current `$this` variable values with their specific datatype | string | 0..* |
| *This Values* | part.value[x] | The value of the `$this` variable | *(any)* | 0..1 |
| *This Values* | part.extension | http://fhir.forms-lab.com/StructureDefinition/resource-path<br/>Path to the this element in the resource | string | 0..1 |
| *Array Index* | part.name = `'index'` | Current array `$index` during iteration | string | 0..1 |
| *Array Index* | part.valueInteger | The numeric `$index` value | integer | 1..1 |

> **Note:** The UI processes debug-trace data by first creating a context marker entry, then processing each debug step. Resource paths are handled at multiple levels - both as direct parts and as extensions on value parts.
>
> **Note:** If the result is a simple type, then both the value, and location in the resource should be provided. If the result is complex, and is from a location in the test resource, then just the resource path is sufficient *(the UI will provide the linkage and is more concise)*.

Example Debug trace part extract:
```json
{
  "name": "debug-trace",
  "valueString": "Patient.name[0]",
  "part": [
    {
      "name": "6,5,constant",
      "part": [
        {
          "name": "string",
          "valueString": "trc"
        },
        {
          "name": "focus-resource-path",
          "valueString": "Patient.name[0]"
        },
        {
          "name": "this-resource-path",
          "valueString": "Patient.name[0]"
        },
        {
          "name": "index",
          "valueInteger": 0
        }
      ]
    },
    {
      "name": "0,5,trace",
      "part": [
        {
          "name": "resource-path",
          "valueString": "Patient.name[0]"
        },
        {
          "name": "focus-resource-path",
          "valueString": "Patient.name[0]"
        },
        {
          "name": "this-resource-path",
          "valueString": "Patient.name[0]"
        },
        {
          "name": "index",
          "valueInteger": 0
        }
      ]
    },
```

### Example Request:

``` rest
POST: [service-url]
Content-Type: application/json
```
``` json
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "expression",
      "valueString": "trace('trc').given.join(' ')\n.combine(family).join(', ')\n| family | %varValue"
    },
    {
      "name": "context",
      "valueString": "name"
    },
    {
      "name": "validate",
      "valueBoolean": true
    },
    {
      "name": "variables",
      "part": [
        {
          "name": "varValue",
          "valueString": "testMe"
        }
      ]
    },
    {
      "name": "resource",
      "resource": {
        "resourceType": "Patient",
        "id": "example",
        "identifier": [
          {
            "use": "usual",
            "type": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                  "code": "MR"
                }
              ]
            },
            "system": "urn:oid:1.2.36.146.595.217.0.1",
            "value": "12345",
            "period": {
              "start": "2001-05-06"
            },
            "assigner": {
              "display": "Acme Healthcare"
            }
          }
        ],
        "active": true,
        "name": [
          {
            "use": "official",
            "family": "Chalmers",
            "given": [
              "Peter",
              "James"
            ]
          },
          {
            "use": "usual",
            "given": [
              "Jim"
            ]
          },
          {
            "use": "maiden",
            "family": "Windsor",
            "given": [
              "Peter",
              "James"
            ],
            "period": {
              "end": "2002"
            }
          }
        ],
        "telecom": [
          {
            "use": "home"
          },
          {
            "system": "phone",
            "value": "(03) 5555 6473",
            "use": "work",
            "rank": 1
          },
          {
            "system": "phone",
            "value": "(03) 3410 5613",
            "use": "mobile",
            "rank": 2
          },
          {
            "system": "phone",
            "value": "(03) 5555 8834",
            "use": "old",
            "period": {
              "end": "2014"
            }
          }
        ],
        "gender": "male",
        "birthDate": "1974-12-25",
        "_birthDate": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
              "valueDateTime": "1974-12-25T14:35:45-05:00"
            }
          ]
        },
        "deceasedBoolean": false,
        "address": [
          {
            "use": "home",
            "type": "both",
            "text": "534 Erewhon St PeasantVille, Rainbow, Vic  3999",
            "line": [
              "534 Erewhon St"
            ],
            "city": "PleasantVille",
            "district": "Rainbow",
            "state": "Vic",
            "postalCode": "3999",
            "period": {
              "start": "1974-12-25"
            }
          }
        ],
        "contact": [
          {
            "relationship": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
                    "code": "N"
                  }
                ]
              }
            ],
            "name": {
              "family": "du Marché",
              "_family": {
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
                    "valueString": "VV"
                  }
                ]
              },
              "given": [
                "Bénédicte"
              ]
            },
            "telecom": [
              {
                "system": "phone",
                "value": "+33 (237) 998327"
              }
            ],
            "address": {
              "use": "home",
              "type": "both",
              "line": [
                "534 Erewhon St"
              ],
              "city": "PleasantVille",
              "district": "Rainbow",
              "state": "Vic",
              "postalCode": "3999",
              "period": {
                "start": "1974-12-25"
              }
            },
            "gender": "female",
            "period": {
              "start": "2012"
            }
          }
        ],
        "managingOrganization": {
          "reference": "Organization/1"
        }
      }
    },
    {
      "name": "terminologyserver",
      "valueString": "https://tx.fhir.org/r4"
    }
  ]
}
```

### Example Response:

``` json
{
  "resourceType": "Parameters",
  "id": "fhirpath",
  "parameter": [
    {
      "name": "parameters",
      "part": [
        {
          "name": "evaluator",
          "valueString": "Firely-5.12.2 (R4B)"
        },
        {
          "name": "expectedReturnType",
          "valueString": "string[]"
        },
        {
          "name": "parseDebugTree",
          "valueString": "{\r\n  \"ExpressionType\": \"BinaryExpression\",\r\n  \"Name\": \"|\",\r\n  \"Arguments\": [\r\n    {\r\n      \"ExpressionType\": \"BinaryExpression\",\r\n      \"Name\": \"|\",\r\n      \"Arguments\": [\r\n        {\r\n          \"ExpressionType\": \"FunctionCallExpression\",\r\n          \"Name\": \"join\",\r\n          \"Arguments\": [\r\n            {\r\n              \"ExpressionType\": \"FunctionCallExpression\",\r\n              \"Name\": \"combine\",\r\n              \"Arguments\": [\r\n                {\r\n                  \"ExpressionType\": \"FunctionCallExpression\",\r\n                  \"Name\": \"join\",\r\n                  \"Arguments\": [\r\n                    {\r\n                      \"ExpressionType\": \"ChildExpression\",\r\n                      \"Name\": \"given\",\r\n                      \"Arguments\": [\r\n                        {\r\n                          \"ExpressionType\": \"FunctionCallExpression\",\r\n                          \"Name\": \"trace\",\r\n                          \"Arguments\": [\r\n                            {\r\n                              \"ExpressionType\": \"AxisExpression\",\r\n                              \"Name\": \"builtin.that\",\r\n                              \"ReturnType\": \"HumanName\"\r\n                            },\r\n                            {\r\n                              \"ExpressionType\": \"ConstantExpression\",\r\n                              \"Name\": \"trc\",\r\n                              \"ReturnType\": \"string\",\r\n                              \"Position\": 6,\r\n                              \"Length\": 5\r\n                            }\r\n                          ],\r\n                          \"ReturnType\": \"HumanName\",\r\n                          \"Position\": 0,\r\n                          \"Length\": 5\r\n                        }\r\n                      ],\r\n                      \"ReturnType\": \"string[]\",\r\n                      \"Position\": 13,\r\n                      \"Length\": 5\r\n                    },\r\n                    {\r\n                      \"ExpressionType\": \"ConstantExpression\",\r\n                      \"Name\": \" \",\r\n                      \"ReturnType\": \"string\",\r\n                      \"Position\": 24,\r\n                      \"Length\": 3\r\n                    }\r\n                  ],\r\n                  \"ReturnType\": \"string\",\r\n                  \"Position\": 19,\r\n                  \"Length\": 4\r\n                },\r\n                {\r\n                  \"ExpressionType\": \"ChildExpression\",\r\n                  \"Name\": \"family\",\r\n                  \"Arguments\": [\r\n                    {\r\n                      \"ExpressionType\": \"AxisExpression\",\r\n                      \"Name\": \"builtin.that\",\r\n                      \"ReturnType\": \"HumanName\"\r\n                    }\r\n                  ],\r\n                  \"ReturnType\": \"string\",\r\n                  \"Position\": 38,\r\n                  \"Length\": 6\r\n                }\r\n              ],\r\n              \"ReturnType\": \"string[]\",\r\n              \"Position\": 30,\r\n              \"Length\": 7\r\n            },\r\n            {\r\n              \"ExpressionType\": \"ConstantExpression\",\r\n              \"Name\": \", \",\r\n              \"ReturnType\": \"string\",\r\n              \"Position\": 51,\r\n              \"Length\": 4\r\n            }\r\n          ],\r\n          \"ReturnType\": \"string\",\r\n          \"Position\": 46,\r\n          \"Length\": 4\r\n        },\r\n        {\r\n          \"ExpressionType\": \"ChildExpression\",\r\n          \"Name\": \"family\",\r\n          \"Arguments\": [\r\n            {\r\n              \"ExpressionType\": \"AxisExpression\",\r\n              \"Name\": \"builtin.that\",\r\n              \"ReturnType\": \"HumanName\"\r\n            }\r\n          ],\r\n          \"ReturnType\": \"string\",\r\n          \"Position\": 59,\r\n          \"Length\": 6\r\n        }\r\n      ],\r\n      \"ReturnType\": \"string[]\",\r\n      \"Position\": 57,\r\n      \"Length\": 1\r\n    },\r\n    {\r\n      \"ExpressionType\": \"VariableRefExpression\",\r\n      \"Name\": \"varValue\",\r\n      \"ReturnType\": \"string\",\r\n      \"Position\": 68,\r\n      \"Length\": 9\r\n    }\r\n  ],\r\n  \"ReturnType\": \"string[]\",\r\n  \"Position\": 66,\r\n  \"Length\": 1\r\n}"
        },
        {
          "name": "parseDebug",
          "valueString": "trace(\r\n    'trc' : string\r\n) : HumanName  // trace(...)\r\n.given : string[]\r\n.join(\r\n    ' ' : string\r\n) : string  // join(...)\r\n.combine(family : string\r\n) : string[]  // combine\r\n.join(\r\n    ', ' : string\r\n) : string  // join(...)\r\n|\r\n    family : string\r\n: string[]  // op: |\r\n|\r\n    %varValue : string\r\n: string[]  // op: |\r\n"
        },
        {
          "name": "context",
          "valueString": "name"
        },
        {
          "name": "expression",
          "valueString": "trace('trc').given.join(' ')\n.combine(family).join(', ')\n| family | %varValue"
        },
        {
          "name": "resource",
          "resource": {
            "resourceType": "Patient",
            "id": "example",
            "identifier": [
              {
                "use": "usual",
                "type": {
                  "coding": [
                    {
                      "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                      "code": "MR"
                    }
                  ]
                },
                "system": "urn:oid:1.2.36.146.595.217.0.1",
                "value": "12345",
                "period": {
                  "start": "2001-05-06"
                },
                "assigner": {
                  "display": "Acme Healthcare"
                }
              }
            ],
            "active": true,
            "name": [
              {
                "use": "official",
                "family": "Chalmers",
                "given": [
                  "Peter",
                  "James"
                ]
              },
              {
                "use": "usual",
                "given": [
                  "Jim"
                ]
              },
              {
                "use": "maiden",
                "family": "Windsor",
                "given": [
                  "Peter",
                  "James"
                ],
                "period": {
                  "end": "2002"
                }
              }
            ],
            "telecom": [
              {
                "use": "home"
              },
              {
                "system": "phone",
                "value": "(03) 5555 6473",
                "use": "work",
                "rank": 1
              },
              {
                "system": "phone",
                "value": "(03) 3410 5613",
                "use": "mobile",
                "rank": 2
              },
              {
                "system": "phone",
                "value": "(03) 5555 8834",
                "use": "old",
                "period": {
                  "end": "2014"
                }
              }
            ],
            "gender": "male",
            "birthDate": "1974-12-25",
            "_birthDate": {
              "extension": [
                {
                  "url": "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
                  "valueDateTime": "1974-12-25T14:35:45-05:00"
                }
              ]
            },
            "deceasedBoolean": false,
            "address": [
              {
                "use": "home",
                "type": "both",
                "text": "534 Erewhon St PeasantVille, Rainbow, Vic  3999",
                "line": [
                  "534 Erewhon St"
                ],
                "city": "PleasantVille",
                "district": "Rainbow",
                "state": "Vic",
                "postalCode": "3999",
                "period": {
                  "start": "1974-12-25"
                }
              }
            ],
            "contact": [
              {
                "relationship": [
                  {
                    "coding": [
                      {
                        "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
                        "code": "N"
                      }
                    ]
                  }
                ],
                "name": {
                  "family": "du Marché",
                  "_family": {
                    "extension": [
                      {
                        "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
                        "valueString": "VV"
                      }
                    ]
                  },
                  "given": [
                    "Bénédicte"
                  ]
                },
                "telecom": [
                  {
                    "system": "phone",
                    "value": "+33 (237) 998327"
                  }
                ],
                "address": {
                  "use": "home",
                  "type": "both",
                  "line": [
                    "534 Erewhon St"
                  ],
                  "city": "PleasantVille",
                  "district": "Rainbow",
                  "state": "Vic",
                  "postalCode": "3999",
                  "period": {
                    "start": "1974-12-25"
                  }
                },
                "gender": "female",
                "period": {
                  "start": "2012"
                }
              }
            ],
            "managingOrganization": {
              "reference": "Organization/1"
            }
          }
        },
        {
          "name": "terminologyServerUrl",
          "valueString": "https://tx.fhir.org/r4"
        },
        {
          "name": "variables",
          "part": [
            {
              "name": "varValue",
              "valueString": "testMe"
            }
          ]
        }
      ]
    },
    {
      "name": "result",
      "valueString": "Patient.name[0]",
      "part": [
        {
          "name": "string",
          "valueString": "Peter James, Chalmers"
        },
        {
          "extension": [
            {
              "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
              "valueString": "Patient.name[0].family"
            }
          ],
          "name": "string",
          "valueString": "Chalmers"
        },
        {
          "name": "string",
          "valueString": "testMe"
        },
        {
          "name": "trace",
          "valueString": "trc",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0]"
                }
              ],
              "name": "HumanName",
              "valueHumanName": {
                "use": "official",
                "family": "Chalmers",
                "given": [
                  "Peter",
                  "James"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "name": "debug-trace",
      "valueString": "Patient.name[0]",
      "part": [
        {
          "name": "6,5,constant",
          "part": [
            {
              "name": "string",
              "valueString": "trc"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "0,5,trace",
          "part": [
            {
              "name": "resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "13,5,given",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].given[0]"
                }
              ],
              "name": "string",
              "valueString": "Peter"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].given[1]"
                }
              ],
              "name": "string",
              "valueString": "James"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "24,3,constant",
          "part": [
            {
              "name": "string",
              "valueString": " "
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "19,4,join",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].given[0]"
                }
              ],
              "name": "focus-string",
              "valueString": "Peter"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].given[1]"
                }
              ],
              "name": "focus-string",
              "valueString": "James"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "38,6,family",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].family"
                }
              ],
              "name": "string",
              "valueString": "Chalmers"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "30,7,combine",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].family"
                }
              ],
              "name": "string",
              "valueString": "Chalmers"
            },
            {
              "name": "focus-string",
              "valueString": "Peter James"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "51,4,constant",
          "part": [
            {
              "name": "string",
              "valueString": ", "
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "46,4,join",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James, Chalmers"
            },
            {
              "name": "focus-string",
              "valueString": "Peter James"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].family"
                }
              ],
              "name": "focus-string",
              "valueString": "Chalmers"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "59,6,family",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].family"
                }
              ],
              "name": "string",
              "valueString": "Chalmers"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "57,1,|",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James, Chalmers"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].family"
                }
              ],
              "name": "string",
              "valueString": "Chalmers"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "68,9,%varValue",
          "part": [
            {
              "name": "string",
              "valueString": "testMe"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "66,1,|",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James, Chalmers"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[0].family"
                }
              ],
              "name": "string",
              "valueString": "Chalmers"
            },
            {
              "name": "string",
              "valueString": "testMe"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[0]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        }
      ]
    },
    {
      "name": "result",
      "valueString": "Patient.name[1]",
      "part": [
        {
          "name": "string",
          "valueString": "Jim"
        },
        {
          "name": "string",
          "valueString": "testMe"
        },
        {
          "name": "trace",
          "valueString": "trc",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[1]"
                }
              ],
              "name": "HumanName",
              "valueHumanName": {
                "use": "usual",
                "given": [
                  "Jim"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "name": "debug-trace",
      "valueString": "Patient.name[1]",
      "part": [
        {
          "name": "6,5,constant",
          "part": [
            {
              "name": "string",
              "valueString": "trc"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "0,5,trace",
          "part": [
            {
              "name": "resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "13,5,given",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[1].given[0]"
                }
              ],
              "name": "string",
              "valueString": "Jim"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "24,3,constant",
          "part": [
            {
              "name": "string",
              "valueString": " "
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "19,4,join",
          "part": [
            {
              "name": "string",
              "valueString": "Jim"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[1].given[0]"
                }
              ],
              "name": "focus-string",
              "valueString": "Jim"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "38,6,family",
          "part": [
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "30,7,combine",
          "part": [
            {
              "name": "string",
              "valueString": "Jim"
            },
            {
              "name": "focus-string",
              "valueString": "Jim"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "51,4,constant",
          "part": [
            {
              "name": "string",
              "valueString": ", "
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "46,4,join",
          "part": [
            {
              "name": "string",
              "valueString": "Jim"
            },
            {
              "name": "focus-string",
              "valueString": "Jim"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "59,6,family",
          "part": [
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "57,1,|",
          "part": [
            {
              "name": "string",
              "valueString": "Jim"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "68,9,%varValue",
          "part": [
            {
              "name": "string",
              "valueString": "testMe"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "66,1,|",
          "part": [
            {
              "name": "string",
              "valueString": "Jim"
            },
            {
              "name": "string",
              "valueString": "testMe"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[1]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        }
      ]
    },
    {
      "name": "result",
      "valueString": "Patient.name[2]",
      "part": [
        {
          "name": "string",
          "valueString": "Peter James, Windsor"
        },
        {
          "extension": [
            {
              "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
              "valueString": "Patient.name[2].family"
            }
          ],
          "name": "string",
          "valueString": "Windsor"
        },
        {
          "name": "string",
          "valueString": "testMe"
        },
        {
          "name": "trace",
          "valueString": "trc",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2]"
                }
              ],
              "name": "HumanName",
              "valueHumanName": {
                "use": "maiden",
                "family": "Windsor",
                "given": [
                  "Peter",
                  "James"
                ],
                "period": {
                  "end": "2002"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "name": "debug-trace",
      "valueString": "Patient.name[2]",
      "part": [
        {
          "name": "6,5,constant",
          "part": [
            {
              "name": "string",
              "valueString": "trc"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "0,5,trace",
          "part": [
            {
              "name": "resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "13,5,given",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].given[0]"
                }
              ],
              "name": "string",
              "valueString": "Peter"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].given[1]"
                }
              ],
              "name": "string",
              "valueString": "James"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "24,3,constant",
          "part": [
            {
              "name": "string",
              "valueString": " "
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "19,4,join",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].given[0]"
                }
              ],
              "name": "focus-string",
              "valueString": "Peter"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].given[1]"
                }
              ],
              "name": "focus-string",
              "valueString": "James"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "38,6,family",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].family"
                }
              ],
              "name": "string",
              "valueString": "Windsor"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "30,7,combine",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].family"
                }
              ],
              "name": "string",
              "valueString": "Windsor"
            },
            {
              "name": "focus-string",
              "valueString": "Peter James"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "51,4,constant",
          "part": [
            {
              "name": "string",
              "valueString": ", "
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "46,4,join",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James, Windsor"
            },
            {
              "name": "focus-string",
              "valueString": "Peter James"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].family"
                }
              ],
              "name": "focus-string",
              "valueString": "Windsor"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "59,6,family",
          "part": [
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].family"
                }
              ],
              "name": "string",
              "valueString": "Windsor"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "57,1,|",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James, Windsor"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].family"
                }
              ],
              "name": "string",
              "valueString": "Windsor"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "68,9,%varValue",
          "part": [
            {
              "name": "string",
              "valueString": "testMe"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        },
        {
          "name": "66,1,|",
          "part": [
            {
              "name": "string",
              "valueString": "Peter James, Windsor"
            },
            {
              "extension": [
                {
                  "url": "http://fhir.forms-lab.com/StructureDefinition/resource-path",
                  "valueString": "Patient.name[2].family"
                }
              ],
              "name": "string",
              "valueString": "Windsor"
            },
            {
              "name": "string",
              "valueString": "testMe"
            },
            {
              "name": "focus-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "this-resource-path",
              "valueString": "Patient.name[2]"
            },
            {
              "name": "index",
              "valueInteger": 0
            }
          ]
        }
      ]
    }
  ]
}
```
