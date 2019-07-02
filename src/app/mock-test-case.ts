import { TestCase } from './test-case';

import { TESTTIMECRITERIA, TESTTIMECITYCRITERIA } from './mock-test-criteria';

export const TESTTIMECASE: TestCase = {
  wakeword: 'Ok Google',
  prompt: 'wie viel Uhr ist es?',
  testCriteria: TESTTIMECRITERIA
};

export const TESTCITYCASE: TestCase = {
  wakeword: 'Ok Google',
  prompt: 'und in Lissabon?',
  testCriteria: TESTTIMECITYCRITERIA
};
