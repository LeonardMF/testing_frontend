import { TestDialog } from './test-dialog';
import { TESTTIMECASE, TESTCITYCASE } from './mock-test-case';

export const TESTTIMEDIALOG: TestDialog = {
  name: 'Uhrzeitansage',
  cases: [TESTTIMECASE, TESTCITYCASE]
};

export const TESTTIME: TestDialog = {
  name: 'Uhrzeitansage',
  cases: [TESTTIMECASE]
};
