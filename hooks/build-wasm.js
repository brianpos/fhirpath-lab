// This hook handles building the WASM module for fhir-toolbox-go
// If the Go compiler is not available, it will gracefully skip building
export default async function buildWasmHook() {
  const { execSync } = await import('child_process');
  const fs = await import('fs');
  const path = await import('path');

  // Only run during build time, not during runtime
  if (process.client) return;

  // Use console for logging instead of consola
  console.log('[build-wasm] Starting WASM build process');

  try {
    // Check if Go compiler is available
    execSync('go version', { stdio: 'ignore' });

    console.log('[build-wasm] Go compiler found, building WASM module...');

    // Get the project root directory
    const rootDir = path.resolve(process.cwd());
    const fhirToolboxDir = path.join(rootDir, 'fhir-toolbox-go');
    const staticDir = path.join(rootDir, 'static');

    // Ensure static directory exists
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }

    // Build the WASM module
    execSync('GOOS=js GOARCH=wasm go build -o ../static/fhir-toolbox-go.wasm .', {
      cwd: fhirToolboxDir,
      stdio: 'inherit'
    });

    console.log('[build-wasm] WASM module built successfully');
  } catch (error) {
    console.warn('[build-wasm] Go compiler not found or WASM build failed');
    console.log('[build-wasm] Building without fhir-toolbox-go support');
  }
}
