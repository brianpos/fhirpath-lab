//go:build js && wasm

package main

import (
	"fhirpath-lab-toolbox-go/evaluate"
	"syscall/js"
)

func main() {
	// Create a channel to keep the program running
	c := make(chan struct{}, 0)

	// Register the evaluate.Expression function in the global scope
	js.Global().Set("evaluateFhirPath", js.FuncOf(evaluate.Expression))

	// Keep the program running
	<-c
}
