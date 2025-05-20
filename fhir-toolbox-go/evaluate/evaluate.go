//go:build js && wasm

package evaluate

import (
	"encoding/json"
	"fmt"
	"strings"
	"syscall/js"

	"github.com/DAMEDIC/fhir-toolbox-go/fhirpath"
	"github.com/DAMEDIC/fhir-toolbox-go/model/gen/r4"
	"github.com/DAMEDIC/fhir-toolbox-go/model/gen/r5"
)

// Expression is the main function that will be called from JavaScript
func Expression(this js.Value, args []js.Value) any {
	if len(args) != 5 {
		return js.ValueOf(map[string]any{
			"error": "Invalid number of arguments. Expected 4: resource, contextExpression, mainExpression, environment and FHIR release",
		})
	}

	// Parse the input arguments
	resourceJSON := args[0].String()
	contextExpressionStr := args[1].String()
	mainExpressionStr := args[2].String()
	environmentJSON := args[3].String()
	fhirRelease := args[4].String()

	// Parse the resource JSON
	var (
		resource fhirpath.Element
		err      error
	)
	switch strings.ToUpper(fhirRelease) {
	case "R4":
		var r r4.ContainedResource
		err = json.Unmarshal([]byte(resourceJSON), &r)
		resource = r
	case "R5":
		var r r5.ContainedResource
		err = json.Unmarshal([]byte(resourceJSON), &r)
		resource = r
	}
	if err != nil {
		return js.ValueOf(map[string]any{
			"error": "Failed to parse resource JSON: " + err.Error(),
		})
	}

	// Parse the environment JSON with UseNumber to preserve number precision
	var environment map[string]any
	dec := json.NewDecoder(strings.NewReader(environmentJSON))
	dec.UseNumber()
	if err := dec.Decode(&environment); err != nil {
		return js.ValueOf(map[string]any{
			"error": "Failed to parse environment JSON: " + err.Error(),
		})
	}

	ctx := r4.Context()

	// Add environment variables to context
	for key, value := range environment {
		element, err := jsonToElement(value)
		if err != nil {
			return js.ValueOf(map[string]any{
				"error": "Failed to convert environment value to FHIRPath element: " + err.Error(),
			})
		}
		ctx = fhirpath.WithEnv(ctx, key, element)
	}

	// First evaluate the context expression if provided
	var contextNodes []fhirpath.Element
	if contextExpressionStr != "" {
		contextExpr, err := fhirpath.Parse(contextExpressionStr)
		if err != nil {
			return js.ValueOf(map[string]any{
				"error": "Failed to parse context expression: " + err.Error(),
			})
		}

		contextResult, err := fhirpath.Evaluate(ctx, resource, contextExpr)
		if err != nil {
			return js.ValueOf(map[string]any{
				"error": "Context expression evaluation error: " + err.Error(),
			})
		}

		contextNodes = contextResult
	} else {
		// If no context expression, use the resource as the context
		resourceElement, err := jsonToElement(resource)
		if err != nil {
			return js.ValueOf(map[string]any{
				"error": "Failed to convert resource to FHIRPath element: " + err.Error(),
			})
		}
		contextNodes = []fhirpath.Element{resourceElement}
	}

	// Parse the main FHIRPath expression
	mainExpr, err := fhirpath.Parse(mainExpressionStr)
	if err != nil {
		return js.ValueOf(map[string]any{
			"error": "Failed to parse main FHIRPath expression: " + err.Error(),
		})
	}

	// Evaluate the main expression for each context node
	var allResults []any
	for _, contextNode := range contextNodes {
		// Clear trace results for each context node
		traceResults := make([]map[string]any, 0)
		tracer := &expressionTracer{
			traceResults: &traceResults,
		}

		// Add tracer to context for main expression evaluation
		ctx = fhirpath.WithTracer(ctx, tracer)

		result, err := fhirpath.Evaluate(ctx, contextNode, mainExpr)
		if err != nil {
			return js.ValueOf(map[string]any{
				"error": "Main expression evaluation error: " + err.Error(),
			})
		}

		// Create result entry with context and trace information
		resultEntry := map[string]any{
			"context": fmt.Sprintf("%s[%d]", contextExpressionStr, len(allResults)),
			"result":  make([]map[string]any, 0),
			"trace":   traceResults,
		}

		// Convert FHIRPath collection to []any
		for _, item := range result {
			typeStr, _ := item.TypeInfo().QualifiedName()
			resultEntry["result"] = append(resultEntry["result"].([]map[string]any), map[string]any{
				"value": item,
				"type":  typeStr,
			})
		}

		allResults = append(allResults, resultEntry)
	}

	// Convert the results to JSON
	resultJSON, err := json.Marshal(allResults)
	if err != nil {
		return js.ValueOf(map[string]any{
			"error": "Failed to marshal result: " + err.Error(),
		})
	}

	return map[string]any{
		"result": string(resultJSON),
	}
}

// expressionTracer implements the fhirpath.Tracer interface
type expressionTracer struct {
	traceResults *[]map[string]any
}

// Log implements the fhirpath.Tracer interface
func (t *expressionTracer) Log(name string, collection fhirpath.Collection) error {
	for _, item := range collection {
		typeStr, _ := item.TypeInfo().QualifiedName()

		traceEntry := map[string]any{
			"name":  name,
			"type":  typeStr,
			"value": item,
		}

		*t.traceResults = append(*t.traceResults, traceEntry)
	}
	return nil
}
