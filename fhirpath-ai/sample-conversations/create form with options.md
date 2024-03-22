**Author:**
 create a new form with a group to capture some basic demographics, and a second group with contact details - name, relationship, mobile phone number

**FhirPath AI:**
 To create a new FHIR Questionnaire with two groups, one for basic demographics and another for contact details, you can use the following resource JSON:

```questionnaire
{
  "resourceType": "Questionnaire",
  "id": "basic-demographics-contact-details",
  "status": "active",
  "item": [
    {
      "linkId": "1",
      "type": "group",
      "text": "Basic Demographics",
      "item": [
        {
          "linkId": "1.1",
          "type": "string",
          "text": "First Name",
          "required": true
        },
        {
          "linkId": "1.2",
          "type": "string",
          "text": "Last Name",
          "required": true
        },
        {
          "linkId": "1.3",
          "type": "date",
          "text": "Date of Birth",
          "required": true
        },
        {
          "linkId": "1.4",
          "type": "string",
          "text": "Gender",
          "required": true
        }
      ]
    },
    {
      "linkId": "2",
      "type": "group",
      "text": "Contact Details",
      "item": [
        {
          "linkId": "2.1",
          "type": "string",
          "text": "Name",
          "required": true
        },
        {
          "linkId": "2.2",
          "type": "string",
          "text": "Relationship",
          "required": true
        },
        {
          "linkId": "2.3",
          "type": "string",
          "text": "Mobile Phone Number",
          "required": true
        }
      ]
    }]
}
```

This will create a FHIR Questionnaire with two groups: "Basic Demographics" (group 1), and "Contact Details" (group 2). The Basic Demographics group has items for First Name, Last Name, Date of Birth, and Gender. The Contact Details group has items for Name, Relationship, and Mobile Phone Number. All items are marked as required.

**Author:**
 Based on the FHIR Questionnaire
``` json
  {"resourceType":"Questionnaire","id":"basic-demographics-contact-details","status":"active","item":[{"linkId":"1","type":"group","text":"Basic Demographics","item":[{"linkId":"1.1","type":"string","text":"First Name","required":true},{"linkId":"1.2","type":"string","text":"Last Name","required":true},{"linkId":"1.3","type":"date","text":"Date of Birth","required":true},{"linkId":"1.4","type":"string","text":"Gender","required":true}]},{"linkId":"2","type":"group","text":"Contact Details","item":[{"linkId":"2.1","type":"string","text":"Name","required":true},{"linkId":"2.2","type":"string","text":"Relationship","required":true},{"linkId":"2.3","type":"string","text":"Mobile Phone Number","required":true}]}]}

```

**Author:**
 change the gender to a combobox with options

**FhirPath AI:**
 To change the gender item to a combobox with options, update the "1.4" item type to "choice" and add an "answerOption" property with the desired options. Here's the updated FHIR Questionnaire:

```questionnaire
{
  "resourceType": "Questionnaire",
  "id": "basic-demographics-contact-details",
  "status": "active",
  "item": [
    {
      "linkId": "1",
      "type": "group",
      "text": "Basic Demographics",
      "item": [
        {
          "linkId": "1.1",
          "type": "string",
          "text": "First Name",
          "required": true
        },
        {
          "linkId": "1.2",
          "type": "string",
          "text": "Last Name",
          "required": true
        },
        {
          "linkId": "1.3",
          "type": "date",
          "text": "Date of Birth",
          "required": true
        },
        {
          "linkId": "1.4",
          "type": "choice",
          "text": "Gender",
          "required": true,
          "answerOption": [
            {
              "valueCoding": {
                "code": "male",
                "display": "Male"
              }
            },
            {
              "valueCoding": {
                "code": "female",
                "display": "Female"
              }
            },
            {
              "valueCoding": {
                "code": "other",
                "display": "Other"
              }
            },
            {
              "valueCoding": {
                "code": "unknown",
                "display": "Unknown"
              }
            }
          ]
        }
      ]
    },
    {
      "linkId": "2",
      "type": "group",
      "text": "Contact Details",
      "item": [
        {
          "linkId": "2.1",
          "type": "string",
          "text": "Name",
          "required": true
        },
        {
          "linkId": "2.2",
          "type": "string",
          "text": "Relationship",
          "required": true
        },
        {
          "linkId": "2.3",
          "type": "string",
          "text": "Mobile Phone Number",
          "required": true
        }
      ]
    }
  ]
}
```

The gender item (1.4) now has a type of "choice" and provides answer options: Male, Female, Other, and Unknown.

**Author:**
 use the itemControl extension to set the combobox

**FhirPath AI:**
 To set the combobox using the `itemControl` extension, you need to add the extension to the gender item (1.4). Here's the updated FHIR Questionnaire:

```questionnaire
{
  "resourceType": "Questionnaire",
  "id": "basic-demographics-contact-details",
  "status": "active",
  "item": [
    {
      "linkId": "1",
      "type": "group",
      "text": "Basic Demographics",
      "item": [
        {
          "linkId": "1.1",
          "type": "string",
          "text": "First Name",
          "required": true
        },
        {
          "linkId": "1.2",
          "type": "string",
          "text": "Last Name",
          "required": true
        },
        {
          "linkId": "1.3",
          "type": "date",
          "text": "Date of Birth",
          "required": true
        },
        {
          "linkId": "1.4",
          "type": "choice",
          "text": "Gender",
          "required": true,
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
              "valueCodeableConcept": {
                "coding": [
                  {
                    "system": "http://hl7.org/fhir/questionnaire-item-control",
                    "code": "drop-down",
                    "display": "Combobox"
                  }
                ]
              }
            }
          ],
          "answerOption": [
            {
              "valueCoding": {
                "code": "male",
                "display": "Male"
              }
            },
            {
              "valueCoding": {
                "code": "female",
                "display": "Female"
              }
            },
            {
              "valueCoding": {
                "code": "other",
                "display": "Other"
              }
            },
            {
              "valueCoding": {
                "code": "unknown",
                "display": "Unknown"
              }
            }
          ]
        }
      ]
    },
    {
      "linkId": "2",
      "type": "group",
      "text": "Contact Details",
      "item": [
        {
          "linkId": "2.1",
          "type": "string",
          "text": "Name",
          "required": true
        },
        {
          "linkId": "2.2",
          "type": "string",
          "text": "Relationship",
          "required": true
        },
        {
          "linkId": "2.3",
          "type": "string",
          "text": "Mobile Phone Number",
          "required": true
        }
      ]
    }
  ]
}
```

The gender item (1.4) now includes an `extension` property with the appropriate `itemControl` setting ("drop-down") for a combobox.