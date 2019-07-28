import { TestTurn } from './test-turn';

import { TIME_END_CRITERIA,
         TIME_NEXT_CRITERIA,
         TIME_CITY_END_CRITERIA} from './mock-test-criteria';

export const END_TURN: TestTurn = {
  wakeword: '',
  prompt: 'end'
};

// TIME DIALOG
export const TIME_END_TURN: TestTurn = {
  wakeword: 'OK Google',
  prompt: 'wie viel Uhr ist es?',
  testCriteria: TIME_END_CRITERIA
};

export const TIME_NEXT_TURN: TestTurn = {
  wakeword: 'OK Google',
  prompt: 'wie viel Uhr ist es?',
  testCriteria: TIME_NEXT_CRITERIA
};

export const CITY_END_TURN: TestTurn = {
  wakeword: 'OK Google',
  prompt: 'und in Lissabon?',
  testCriteria: TIME_CITY_END_CRITERIA
};

export const TIME_CITY_END_TURN: TestTurn = {
  wakeword: 'OK Google',
  prompt: 'wie viel Uhr ist es in Lissabon?',
  testCriteria: TIME_CITY_END_CRITERIA
};

// // BVG SKILL
// export const OPEN_BVG: TestTurn = {
//   wakeword: 'Alexa',
//   prompt: 'öffne den BVG Skill',
//   testCriteria: GREETING_CRITERIA,
// };

// export const ASK_BVG: TestTurn = {
//   wakeword: ' ',
//   prompt: 'Wie komme ich zum Ernst-Reuter-Platz?',
//   testCriteria: REQUEST_SATION_FROM_CRITERIA,
// };

// export const SEESTRASSE_BVG: TestTurn = {
//   wakeword: ' ',
//   prompt: 'Seestraße',
//   testCriteria: CONNECTION_CRITERIA,
// };

// // VUI

// export const PRAESIDENT: TestTurn = {
//   wakeword: 'OK Google',
//   prompt: 'wer war der 16. Präsident der Vereinigten Staaten?',
//   testCriteria: PRAESIDENT_CRITERIA,
// };

// export const AGE_DEAD: TestTurn = {
//   wakeword: 'OK Google',
//   prompt: 'wie alt war er, als er starb? ',
//   testCriteria: AGE_DEAD_CRITERIA,
// };

// export const PLACE_OF_BIRTH: TestTurn = {
//   wakeword: 'OK Google',
//   prompt: 'wo wurde er geboren?',
//   testCriteria: CITY_BORN_CRITERIA,
// };

// export const RESTAURANT: TestTurn = {
//   wakeword: 'OK Google',
//   prompt: 'was ist das beste Restaurant dort?',
//   testCriteria: RESTAURANT_CRITERIA,
// };
