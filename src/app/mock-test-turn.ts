import { TestCase } from './test-case';

import { TEST_TIME_CRITERIA,
         TEST_TIME_CITY_CRITERIA,
         GREETING_CRITERIA,
         REQUEST_SATION_FROM_CRITERIA,
         CONNECTION_CRITERIA,
         PRAESIDENT_CRITERIA,
         AGE_DEAD_CRITERIA,
         CITY_BORN_CRITERIA,
         RESTAURANT_CRITERIA} from './mock-test-criteria';

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

// VUI

export const PRAESIDENT: TestCase = {
  wakeword: 'OK Google',
  prompt: 'wer war der 16. Präsident der Vereinigten Staaten?',
  testCriteria: PRAESIDENT_CRITERIA,
};

export const AGE_DEAD: TestCase = {
  wakeword: 'OK Google',
  prompt: 'wie alt war er, als er starb? ',
  testCriteria: AGE_DEAD_CRITERIA,
};

export const PLACE_OF_BIRTH: TestCase = {
  wakeword: 'OK Google',
  prompt: 'wo wurde er geboren?',
  testCriteria: CITY_BORN_CRITERIA,
};

export const RESTAURANT: TestCase = {
  wakeword: 'OK Google',
  prompt: 'was ist das beste Restaurant dort?',
  testCriteria: RESTAURANT_CRITERIA,
};
