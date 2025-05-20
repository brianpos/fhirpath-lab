#!/bin/bash

cd fhir-toolbox-go

# Build the WASM module
GOOS=js GOARCH=wasm go build -o ../static/fhir-toolbox-go.wasm .
