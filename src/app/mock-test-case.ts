import { TestCase } from './test-case';

import { TEST_TIME_CRITERIA,
         TEST_TIME_CITY_CRITERIA,
         GREETING_CRITERIA,
         REQUEST_SATION_FROM_CRITERIA,
         CONNECTION_CRITERIA } from './mock-test-criteria';

// TIME DIALOG
export const TEST_TIME_CASE: TestCase = {
  wakeword: 'OK Google',
  prompt: 'wie viel Uhr ist es?',
  testCriteria: TEST_TIME_CRITERIA
};

export const TEST_CITY_CASE: TestCase = {
  wakeword: 'OK Google',
  prompt: 'und in Lissabon?',
  testCriteria: TEST_TIME_CITY_CRITERIA,
};

// BVG SKILL
export const OPEN_BVG: TestCase = {
  wakeword: 'Alexa',
  prompt: 'öffne den BVG Skill',
  testCriteria: GREETING_CRITERIA,
};

export const ASK_BVG: TestCase = {
  wakeword: ' ',
  prompt: 'Wie komme ich zum Ernst-Reuter-Platz?',
  testCriteria: REQUEST_SATION_FROM_CRITERIA,
};

export const SEESTRASSE_BVG: TestCase = {
  wakeword: ' ',
  prompt: 'Seestraße',
  testCriteria: CONNECTION_CRITERIA,
};
