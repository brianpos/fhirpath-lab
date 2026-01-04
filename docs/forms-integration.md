# External Forms Engines Integration

This document describes how external forms rendering and pre-population engines are integrated into the FHIRPath Lab, specifically within the Questionnaire Tester functionality.

> Note: There is a new approach being developed using SMART Web Messaging to integrate truly external forms engines (hosted by third parties) in a secure and privacy-conscious manner. This document focuses on the current integration of npm-based engines. See [SDC SMART Web Messaging - Introduction](sdc-swm-intro.md) and [SDC SMART Web Messaging - Protocol](sdc-swm-protocol.md) for details on the new approach.

## Overview

The FHIRPath Lab integrates multiple external forms engines to provide comprehensive questionnaire rendering, pre-population, and data extraction capabilities. These integrations allow users to test questionnaires with different rendering approaches and validate form behavior across various implementations.

## Integrated Forms Engines

### 1. CSIRO Smart Forms Renderer

The CSIRO (Australian e-Health Research Centre) Smart Forms Renderer is a React-based questionnaire renderer that provides advanced structured data capture (SDC) features.

#### Integration Details
- **Package**: `@aehrc/smart-forms-renderer` 
- **Version**: 1.0.0-alpha.83+ (check package.json for current version)
- **Repository**: https://github.com/aehrc/smart-forms-renderer
- **Component**: `components/Questionnaire/EditorRendererSection.vue`
- **React Wrapper**: `components/Questionnaire/ReactRenderer.tsx`

#### Features
- Full FHIR Questionnaire rendering
- Advanced SDC extensions support
- Real-time response generation
- Field focus tracking with linkId highlighting
- Pre-population support via `@aehrc/sdc-populate`
- Data extraction capabilities

#### Integration Architecture
```
Vue Component (EditorRendererSection.vue)
    ↓ (via vuereact-combined)
React Wrapper (ReactRenderer.tsx)
    ↓
CSIRO SmartFormsRenderer
```

#### Key Methods
- `logResponse()`: Extracts QuestionnaireResponse from the rendered form
- `renderQuestionnaireResponse()`: Renders an existing response in the form
- `highlightPath(linkId)`: Highlights specific form fields

#### Usage in Questionnaire Tester
The CSIRO renderer appears as the "CSIRO Renderer" tab and is always visible. It supports:
- Interactive form rendering
- Response extraction with CSIRO-specific metadata tags
- Field highlighting when navigating from other tabs
- Pre-population integration

### 2. NLM LHC-Forms

The National Library of Medicine (NLM) LHC-Forms is a comprehensive forms rendering library with extensive FHIR support and clinical data integration.

#### Integration Details
- **Library**: LHC-Forms (dynamically loaded)
- **Version**: 38.2.0+ (dynamically loaded from clinicaltables.nlm.nih.gov)
- **Repository**: https://github.com/LHNCBC/lforms
- **Component**: `components/Questionnaire/EditorNLMRendererSection.vue`
- **Dynamic Loader**: `lforms-loader` package

#### Features
- FHIR R4 Questionnaire and QuestionnaireResponse support
- Clinical terminology services integration
- SMART on FHIR context support
- Pre-population with FHIR client integration
- Advanced form controls and validation

#### Integration Architecture
```
Vue Component (EditorNLMRendererSection.vue)
    ↓ (dynamic script loading)
NLM LForms Library
    ↓ (FHIR client integration)
External FHIR Servers
```

#### Key Methods
- `logResponse()`: Extracts QuestionnaireResponse using LForms.Util.getFormFHIRData
- `renderQuestionnaireResponse()`: Merges existing response into LForms
- `prePopLForms()`: Performs pre-population with FHIR context

#### Dynamic Loading Process
```typescript
import { loadLForms } from "lforms-loader";
await loadLForms("38.2.0");
```

#### FHIR Context Setup
```typescript
const fhirContext = FHIR.client(dataServer);
const fhirContextVars = {};
LForms.Util.setFHIRContext(fhirContext, fhirContextVars);
```

#### Usage in Questionnaire Tester
The LHC-Forms renderer appears as the "LHC-Forms" tab and provides:
- Clinical-grade form rendering
- Integration with clinical terminology services  
- Pre-population with patient data
- Response extraction with LForms metadata

### 3. Pre-population Engines

Multiple pre-population engines are integrated to test different approaches to form pre-population.

#### Available Engines

##### Forms-Lab Engine
- **URL**: `https://fhir.forms-lab.com/Questionnaire/$populate`
- **Type**: Custom implementation
- **Features**: Basic pre-population testing

##### CSIRO Pre-population
- **Package**: `@aehrc/sdc-populate`
- **Version**: 4.6.0+
- **Features**: 
  - Advanced SDC pre-population
  - Multi-resource context support
  - Individual resource fetching
  - Batch processing support

##### LForms Pre-population  
- **Integration**: Direct LForms library integration
- **Features**:
  - SMART on FHIR context
  - Patient data integration
  - Real-time pre-population

##### Other/Custom Pre-population
- **Type**: Configurable endpoint
- **Features**: Testing custom implementations

#### Pre-population Architecture

```
QuestionnairePrepopTest.vue
    ↓
Selected Engine Handler
    ↓ (HTTP POST $populate)
External Pre-population Service
    ↓ (Returns QuestionnaireResponse)
Form Renderer Updates
```

## Tab Integration in Questionnaire Tester

The external forms engines are integrated as tabs in the twin-pane tab system:

### Tab Interactions

#### Response Extraction Flow
1. User clicks "Extract" button in toolbar
2. System identifies active renderer tabs
3. Calls `logResponse()` on active renderers
4. Updates Response tab with extracted data
5. Switches to Extract tab for data extraction operations

#### Pre-population Flow
1. User configures context data (patient, author, etc.)
2. User selects pre-population engine
3. System calls appropriate pre-population method
4. Response is distributed to all active renderers
5. User can compare rendering across engines

## Cross-Engine Communication

### Response Data Flow
```
External Engine Response
    ↓ (via $emit('response', response))
Parent Component (tester.vue)  
    ↓ (processUpdatedQuestionnaireResponse)
All Active Renderers
    ↓ (renderQuestionnaireResponse)
Updated Form Displays
```

### Metadata Tagging System
Each engine adds specific metadata tags to distinguish responses:

```typescript
// CSIRO Renderer
response.meta.tag.push({ code: 'csiro:generated' });

// LForms Renderer  
response.meta.tag.push({ code: 'lformsVersion:38.2.0' });
```

### Field Highlighting Integration
When navigating from other tabs (like Pre-Population configuration), the system can highlight specific fields:

```typescript
highlightPath(linkId: string) {
  // Converts linkId to JSON path for resource highlighting
  // Updates ACE editor markers
  // Focuses appropriate form fields
}
```

## Configuration and Settings

### User Settings Integration
- **Tab Spaces**: Consistent JSON formatting across engines
- **Server URLs**: Configurable FHIR server endpoints
- **Advanced Settings**: Show/hide engine-specific features

### Engine-Specific Configuration
- **CSIRO**: Integrated with smart forms renderer settings
- **LForms**: Uses LForms library configuration and FHIR context
- **Pre-population**: Configurable service endpoints

## Development Guidelines

### Adding New External Engines

1. **Create Vue Component**
   - Extend the established pattern in `components/Questionnaire/`
   - Implement required methods: `logResponse()`, `renderQuestionnaireResponse()`
   - Add proper error handling

2. **Update Tab Configuration**
   - Add tab definition in `tabDetails` computed property
   - Configure appropriate icons and visibility conditions

3. **Integrate Response Handling**
   - Emit 'response' events with extracted QuestionnaireResponse
   - Add appropriate metadata tags
   - Handle response rendering from other engines

4. **Update Extract Detection**
   - Add tab name to `extractFromTabs` array if supporting extraction
   - Implement extraction workflow integration

### Best Practices

1. **Error Handling**: Always provide user-friendly error messages
2. **Performance**: Use dynamic loading for large external libraries
3. **Compatibility**: Test with various questionnaire types and extensions
4. **Accessibility**: Ensure form controls meet accessibility standards
5. **Documentation**: Update this document when adding new engines

### Testing Integration

1. **Multi-Engine Testing**: Validate questionnaire behavior across all engines
2. **Response Compatibility**: Ensure responses can be rendered by other engines  
3. **Pre-population Testing**: Verify pre-population works with all renderers
4. **Extract Validation**: Test data extraction from each engine

## Troubleshooting

### Common Issues

1. **Dynamic Loading Failures**: Check network connectivity and CDN availability
2. **FHIR Context Issues**: Verify server endpoints and CORS configuration  
3. **Response Incompatibility**: Check metadata tags and response structure
4. **Pre-population Failures**: Validate context data and service endpoints

### Debug Features

1. **Console Logging**: All engines provide detailed console output
2. **Error Display**: User-friendly error messages in renderer areas
3. **Response Inspection**: JSON view of all generated responses
4. **Network Monitoring**: Browser dev tools for service calls

### Support Resources

- **CSIRO Smart Forms**: https://github.com/aehrc/smart-forms-renderer
- **NLM LForms**: https://lhcforms.nlm.nih.gov/
- **FHIR Specification**: http://hl7.org/fhir/uv/sdc/
- **FHIRPath Lab Issues**: [Project repository issues]

## Conclusion

The external forms engines integration provides comprehensive testing capabilities for FHIR questionnaires. The modular architecture allows for easy addition of new engines while maintaining consistent user experience across different rendering approaches. The integration supports the full questionnaire lifecycle from authoring through pre-population to data extraction and validation.

## Appendix A: Proposed External Forms Engine Integration Options

### Background

The current forms integration differs significantly from the FHIRPath engine integration pattern. While FHIRPath engines are called explicitly by user action, forms engines currently:
- Auto-render simultaneously across all engines
- Automatically share response data between engines
- Have no distinction between internal (npm packages) and external (hosted) engines

For truly external forms engines (hosted by third parties), this presents privacy and user consent concerns, as data would be sent automatically without explicit user permission.

### Proposed Integration Approaches

#### 1. Engine Classification System

Create a classification system for forms engines similar to FHIRPath engines:

```typescript
interface IFormsEngineDetails {
  name: string;
  type: 'renderer' | 'prepopulation' | 'extraction';
  external: boolean;
  requiresExplicitCall: boolean;
  publisher: string;
  description: string;
  url?: string; // for external engines
}
```

#### 2. Opt-in Rendering Architecture

**Current Behavior**: All engines render simultaneously and share responses automatically.

**Proposed Behavior**:
- **Internal engines** (CSIRO, LHC-Forms): Continue auto-rendering and sharing responses
- **External engines**: Show as separate tabs with "render" buttons instead of auto-rendering
- Add visual indicators (web icon, different colors) similar to FHIRPath engines

**Implementation**:
```vue
// For external engines
<template v-slot:ExternalRenderer1>
  <div v-if="!externalEngine1.activated" class="external-engine-prompt">
    <v-alert type="info" icon="mdi-web">
      This is an externally hosted forms engine. Your questionnaire data will be sent to {{ externalEngine1.publisher }}.
      <v-btn @click="activateExternalEngine('engine1')" color="primary">
        Render with {{ externalEngine1.name }}
      </v-btn>
    </v-alert>
  </div>
  <div v-else>
    <!-- Actual renderer component -->
  </div>
</template>
```

#### 3. Data Isolation Strategy

**Option A: Explicit Response Sharing**
- External engines don't automatically receive responses from other engines
- Add "Share Response" buttons to explicitly send data between engines
- Show confirmation dialogs when sharing data with external engines

**Option B: Isolation Levels**
```typescript
enum DataSharingLevel {
  INTERNAL_ONLY = 'internal',     // Only internal engines share data
  EXPLICIT_EXTERNAL = 'explicit', // External engines require explicit sharing
  ALL_ENGINES = 'all'             // Current behavior (for backward compatibility)
}
```

#### 4. Tab Architecture Modification

**Engine Groups Approach**:
```typescript
const tabDetails = [
  // Internal engines group
  { groupName: "Internal Renderers", engines: [...] },
  // External engines group  
  { groupName: "External Renderers", engines: [...], requiresConsent: true }
];
```

**Conditional Response Distribution**:
```typescript
processUpdatedQuestionnaireResponse(value: QuestionnaireResponse, sourceEngine?: string) {
  // Always update internal engines
  this.updateInternalRenderers(value);
  
  // Only update external engines if explicitly enabled
  if (this.userSettings.shareWithExternalEngines) {
    this.updateExternalRenderers(value);
  }
}
```

#### 5. User Settings Integration

Add settings for external forms engines:
```typescript
// User settings for external engine behavior
interface ExternalFormsSettings {
  allowExternalRenderers: boolean;
  autoShareResponses: boolean;
  confirmedExternalEngines: string[]; // engines user has consented to
  defaultDataSharingLevel: DataSharingLevel;
}
```

#### 6. Implementation Strategy

**Phase 1: Infrastructure**
1. Create engine classification system
2. Add external engine detection in tab system
3. Implement selective rendering logic

**Phase 2: UI Enhancements**
1. Add visual indicators (icons, colors) for external engines
2. Implement consent prompts and activation buttons
3. Add data sharing controls

**Phase 3: External Engine Integration**
1. Add first external forms engine as proof of concept
2. Implement HTTP-based renderer communication
3. Add error handling and fallback mechanisms

#### 7. Recommended Flow for External Engines

```
User opens Questionnaire Tester
    ↓
Internal engines auto-render (CSIRO, LHC-Forms)
    ↓
External engine tabs show "activation prompts"
    ↓
User clicks "Render with [External Engine]"
    ↓
Consent dialog: "Send data to [Publisher]?"
    ↓
If accepted: Send questionnaire to external service
    ↓
Receive rendered form or response
    ↓
Display in tab with "external" styling
```

#### 8. Extract/Pre-population Handling

For external engines in extract operations:
```typescript
async extractFormData() {
  // Get active tabs
  let activeTabs = tabControl.getActiveTabs();
  
  // Separate internal and external engines
  let internalTabs = activeTabs.filter(t => !this.isExternalEngine(t.tabName));
  let externalTabs = activeTabs.filter(t => this.isExternalEngine(t.tabName));
  
  // Extract from internal engines automatically
  for (let tab of internalTabs) {
    await this.extractFromEngine(tab);
  }
  
  // Ask permission for external engines
  if (externalTabs.length > 0) {
    let confirmed = await this.confirmExternalExtraction(externalTabs);
    if (confirmed) {
      for (let tab of externalTabs) {
        await this.extractFromEngine(tab);
      }
    }
  }
}
```

### Design Considerations

1. **User Privacy**: External engines require explicit consent before sending data
2. **Visual Distinction**: Clear indicators (similar to FHIRPath engines) for external services
3. **Backward Compatibility**: Internal engines maintain current behavior
4. **Flexibility**: Support for different integration patterns (HTTP APIs, iframes, etc.)
5. **Error Handling**: Graceful fallback when external services are unavailable

### Benefits

- **Privacy Control**: Users explicitly choose when to share data with external services
- **Transparency**: Clear indication of which engines are external
- **Flexibility**: Can support various external engine architectures
- **Consistency**: Aligns with existing FHIRPath engine integration patterns
- **Gradual Migration**: Can be implemented incrementally without breaking existing functionality

This approach maintains the convenience of internal engine integration while providing clear boundaries and user control for external engines, adapted from the FHIRPath engine pattern but tailored for the unique requirements of forms rendering.
