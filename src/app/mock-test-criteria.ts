
import { TestCriteria } from './test-criteria';
import { TIMECRITERIA, CITYCRITERIA } from './mock-test-criteria-entity';

export const TESTTIMECITYCRITERIA: TestCriteria =
  { intent: 'getTime', confidence: 0.75, entities: [TIMECRITERIA, CITYCRITERIA] };
