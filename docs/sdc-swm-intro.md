# Solving the Forms Integration Problem with SMART Web Messaging and SDC

I needed to add external rendering engines to FHIRPath Lab safely and securely — but the traditional approach (npm packages) was hitting a wall.

The specific functionality that I'm adding covers:
* Messages to the renderer:
  * Host external renderer via iframe
  * Send configuration: test data server, terminology server, etc.
  * Send Questionnaire to render
  * Send context data: patient, encounter, author, etc.
  * Send QuestionnaireResponse to display
  * Request current QuestionnaireResponse data
  * Request evaluation of $extract logic
* Messages from the renderer *(unsolicited)*:
  * Receive change notifications (QuestionnaireResponse)
  * Receive focus change events (linkId/simple path expression)
* Also considering messages for:
  * Validation
  * Pre-population
  * Extraction

Today the FHIRPath Lab has support for NLM's L-Forms and CSIRO forms engines, both of which are integrated via npm packages, and as such introduce the possibility for incompatible frameworks, upgrade management issues, and many other concerns.
As these are open source, they can be reviewed and upgraded, however increases the burden on the Lab's maintenance to upgrade components, and isn't a great way to scale to other engines.

However the next engine that is being added into the lab is the AidBox Forms engine. This is a closed source system and not currently published as an NPM package, so the existing approach isn't really practical.

> *Health Samurai have submitted a PR for adding their engine that uses an injected javascript file to insert a custom web-component that has an iframe into their service to achieve this functionality. Inside this script they use web-messages (window.postMessage) to pass the above mentioned data about, so is a great start, and why I'm looking at SMART Web Messaging ...*<br/>
> *(thanks Josh Mandel for pointing me to the HL7 SMART Web Messaging)*

Additional to this David Hay's Forms Builder leverages the launch URLs to open forms in the Lab, but to do this currently he needs to store the Questionnaire on a public server somewhere to test it out. Implementing an interface like this (as a popup) would permit this functionality without needing to actually store the data.

### So this is the background, why SMART web messaging?

If we take a peek at the [SMART Web Messaging](https://hl7.org/fhir/uv/smart-web-messaging/STU1) specification, we can see this style of integration is exactly what the specification is intended to cover!

The examples they give are for things like placing suggested orders, suggestion diagnosis, adding to a scratchpad / shopping cart, each of which is similar to my use case.

This builds on the [HTML5's Web Messaging](https://html.spec.whatwg.org/multipage/web-messaging.html) specification, and adds some additional layers to support handshaking, standardized base message structures (message/response), authentication using SMART App Launch defined protocols, best practices for verifying message processing, and reporting error conditions.

### Comparison: Current vs SMART Web Messaging Approach

| Aspect | Current NPM Package Approach | SMART Web Messaging Approach |
|--------|------------------------------|------------------------------|
| **Integration Method** | Direct npm dependency, bundled into application | Iframe-based isolation via standardized protocol |
| **Framework Compatibility** | Must be compatible with Nuxt 2 + Vue 2 + TypeScript | Framework-agnostic - any renderer works |
| **Closed Source Engines** | Not feasible (requires published npm package) | Fully supported - host any web-accessible renderer |
| **Version Management** | Lab must upgrade dependencies for each engine | Each renderer manages its own versions independently |
| **Security Isolation** | Shared JavaScript context - potential conflicts | Sandboxed iframe with controlled messaging |
| **Maintenance Burden** | High - must monitor and update multiple packages | Low - renderers update independently |
| **Adding New Engines** | Requires code changes, dependency updates, rebuild | Configuration-only - add URL to `config.json` |
| **Testing Unstored Forms** | Not currently possible (requires public server) | Direct - pass Questionnaire via message |
| **Bundle Size Impact** | Increases with each engine added | Minimal - no renderer code bundled |
| **Runtime Updates** | Requires Lab rebuild and redeployment | Renderers can update without Lab changes |


### Are there other use cases that this approach could be used for?
After some experimentation with this approach I can see that this could be used for other things too, such as:
* Launch Form testers within a form builder application
* Educational tools to demonstrate Questionnaire functionality
* Maybe even an alternative way to implement dynamic questionnaires, providing additional questions/answers

### How did my prototype go?
In order to verify this functionality I extended the FHIRPath Lab's Questionnaire tester to include a test tab (as though it was an external renderer) and added buttons to test the key proposed use cases, specifically render Questionnaire, display QuestionnaireResponse and retrieve current QuestionnaireResponse data.<br/>
The "client" popup that I implemented was actually just another copy of the fhirpath lab running in a separate window, so I could easily see the messages being passed back and forth. This also validated David's forms builder use case — he can now test Questionnaires directly without needing to store them on a public server first.

![image](https://hackmd.io/_uploads/rkj4fMGaxl.png)


This wasn't a full implementation of the SMART Web Messaging specification, and not the likely final message structures, but enough to prove the concept. I utilized Claude Sonnet 4.5 to assist in the coding, and the results were promising, with all key use cases successfully demonstrated.

## Next Steps
Next up will be to collaborate with others to see if there is wider interest in this approach, and if we should pursue it further, and document a set of messages for SDC Questionnaire rendering and interaction to meet the needs of the community.

At present I'm meeting with Health Samurai to discuss their AidBox Forms renderer, and see if they would be interested in implementing this approach for their FHIRPath Lab integration.

If you're also interested in this approach, please reach out to me via the [fhir chat](https://chat.fhir.org/#narrow/channel/179255-questionnaire/topic/smart.20web.20messaging/with/542672972).
