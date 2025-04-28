import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  // Add these settings for better debugging
  testTimeout: 30000, // Longer timeout for debugging
  detectOpenHandles: true,
  forceExit: false, // Allow debugger to stay attached
  // For source map support during debugging
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      isolatedModules: true,
      diagnostics: {
        warnOnly: true
      }
    }]
  },
};

export default config;
