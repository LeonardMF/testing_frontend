import { TestTurn } from './test-turn/test-turn';

import { TIME_END_CRITERIA,
         TIME_NEXT_CRITERIA,
         TIME_CITY_END_CRITERIA,
         GREETING_CRITERIA,
         REQUEST_SATION_FROM_CRITERIA,
         DEPARTURE_TIME_CRITERIA,
         CONNECTION_CRITERIA,
         PRAESIDENT_CRITERIA,
         AGE_DEAD_CRITERIA,
         CITY_BORN_CRITERIA,
         RESTAURANT_CRITERIA} from './mock-test-criteria';

export const END_TURN: TestTurn = {
  wakeword: '',
  prompt: 'end'
};

// TIME DIALOG
export const TIME_END_TURN: TestTurn = {
  name: 'start',
  wakeword: 'OK Google',
  prompt: 'wie viel Uhr ist es?',
  criterias: [TIME_END_CRITERIA],
  testCriteria: TIME_END_CRITERIA
};

export const TIME_NEXT_TURN: TestTurn = {
  name: 'start',
  wakeword: 'OK Google',
  prompt: 'wie viel Uhr ist es?',
  criterias: [TIME_NEXT_CRITERIA],
  testCriteria: TIME_NEXT_CRITERIA
};

export const CITY_END_TURN: TestTurn = {
  name: 'next',
  wakeword: 'OK Google',
  prompt: 'und in Lissabon?',
  criterias: [TIME_CITY_END_CRITERIA],
  testCriteria: TIME_CITY_END_CRITERIA
};

export const TIME_CITY_END_TURN: TestTurn = {
  name: 'start',
  wakeword: 'OK Google',
  prompt: 'wie viel Uhr ist es in Lissabon?',
  criterias: [TIME_CITY_END_CRITERIA],
  testCriteria: TIME_CITY_END_CRITERIA
};

// BVG SKILL
export const OPEN_BVG: TestTurn = {
  name: 'start',
  wakeword: 'Alexa',
  prompt: 'öffne den BVG Skill',
  criterias: [GREETING_CRITERIA],
  testCriteria: GREETING_CRITERIA,
};

export const ASK_BVG: TestTurn = {
  name: 'request_connection',
  wakeword: ' ',
  prompt: 'Wie komme ich zum Ernst-Reuter-Platz?',
  criterias: [REQUEST_SATION_FROM_CRITERIA, DEPARTURE_TIME_CRITERIA, CONNECTION_CRITERIA],
  testCriteria: REQUEST_SATION_FROM_CRITERIA,
};

export const SEESTRASSE_BVG: TestTurn = {
  name: 'station_from',
  wakeword: ' ',
  prompt: 'Seestraße',
  criterias: [DEPARTURE_TIME_CRITERIA, CONNECTION_CRITERIA],
  testCriteria: CONNECTION_CRITERIA
};

export const JETZT_BVG: TestTurn = {
  name: 'departure_time',
  wakeword: ' ',
  prompt: 'Jetzt',
  criterias: [REQUEST_SATION_FROM_CRITERIA, CONNECTION_CRITERIA],
  testCriteria: CONNECTION_CRITERIA,
};

// // VUI

export const PRAESIDENT: TestTurn = {
  name: 'start',
  wakeword: 'OK Google',
  prompt: 'wer war der 16. Präsident der Vereinigten Staaten?',
  criterias: [PRAESIDENT_CRITERIA],
  testCriteria: PRAESIDENT_CRITERIA,
};

export const AGE_DEAD: TestTurn = {
  name: 'age_dead',
  wakeword: 'OK Google',
  prompt: 'wie alt war er, als er starb? ',
  criterias: [AGE_DEAD_CRITERIA],
  testCriteria: AGE_DEAD_CRITERIA,
};

export const PLACE_OF_BIRTH: TestTurn = {
  name: 'place_of_birth',
  wakeword: 'OK Google',
  prompt: 'wo wurde er geboren?',
  criterias: [CITY_BORN_CRITERIA],
  testCriteria: CITY_BORN_CRITERIA,
};

export const RESTAURANT: TestTurn = {
  name: 'restaurant',
  wakeword: 'OK Google',
  prompt: 'was ist das beste Restaurant dort?',
  criterias: [RESTAURANT_CRITERIA],
  testCriteria: RESTAURANT_CRITERIA,
};
