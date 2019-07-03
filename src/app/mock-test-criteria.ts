
import { TestCriteria } from './test-criteria';
import { TIMECRITERIA, CITYCRITERIA } from './mock-test-criteria-entity';

export const TESTTIMECITYCRITERIA: TestCriteria = {
  intent: 'getTime',
  confidence: 0.75,
  entities: [TIMECRITERIA, CITYCRITERIA]
};

export const TESTTIMECRITERIA: TestCriteria = {
  intent: 'getTime',
  confidence: 0.75,
  entities: [TIMECRITERIA]
};

export const TESTCITYCRITERIA: TestCriteria = {
  intent: 'getTime',
  confidence: 0.75,
  entities: [CITYCRITERIA]
};
