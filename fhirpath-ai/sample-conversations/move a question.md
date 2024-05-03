**Author:**
 Based on the FHIR Questionnaire
``` json
  {"resourceType":"Questionnaire","id":"fallsRiskAssessment-AU","url":"http://example.com/fhir/Questionnaire/fallsRiskAssessment-AU","version":"1.0","name":"FallsRiskAssessmentAustralia","title":"Formulaire d'évaluation du risque de chute (Australie)","status":"draft","date":"2023-04-01","publisher":"Example Healthcare Provider","jurisdiction":[{"coding":[{"system":"urn:iso:std:iso:3166","code":"AU","display":"Australia"}]}],"purpose":"To assess the risk of falls in elderly patients","item":[{"linkId":"1","text":"Avez-vous eu des chutes au cours de l'année passée ?","type":"boolean"},{"linkId":"2","text":"Prenez-vous actuellement des médicaments susceptibles d'affecter votre équilibre ?","type":"boolean"},{"linkId":"3","text":"Avez-vous des difficultés à marcher ou à vous déplacer ?","type":"boolean"},{"linkId":"4","text":"Combien de fois êtes-vous tombé(e) au cours de l'année passée ?","type":"integer","enableWhen":[{"question":"1","operator":"=","answerBoolean":true}],"enableBehavior":"all"},{"linkId":"5","text":"Comment percevez-vous votre risque de chute ?","type":"choice","answerOption":[{"valueCoding":{"code":"low","display":"Faible"}},{"valueCoding":{"code":"moderate","display":"Modéré"}},{"valueCoding":{"code":"high","display":"Élevé"}}]}]}

```

**Author:**
 Can you move the 1st question down 2 places?

**FhirPath AI:**
 To move the first question down two places in the given Questionnaire, you can adjust the order of the items in the JSON representation. Here is a JSON Patch that performs this action:

```jsonpatch
[
  {
    "op": "remove",
    "path": "/item/0"
  },
  {
    "op": "add",
    "path": "/item/2",
    "value": {
      "linkId": "1",
      "text": "Avez-vous eu des chutes au cours de l'année passée ?",
      "type": "boolean"
    }
  }
]
```

This patch removes the first item and then inserts it at the position after the second original item, effectively moving it down two places.
