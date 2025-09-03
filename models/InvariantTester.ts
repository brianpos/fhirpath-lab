export interface TestCase {
  fileName: string;
  expectedResult: boolean;
  // One of the following will be present depending on source type
  resourceJson?: object;
  resourceXml?: string;
  resourceUrl?: string;
}

export interface TestResult {
  testCase: TestCase;
  actualResult: any;
  status: 'pending' | 'running' | 'pass' | 'fail' | 'error';
  trace?: any[];
  errorMessage?: string;
}
