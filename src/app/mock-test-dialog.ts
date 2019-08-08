import { TestDialog } from './test-dialog';
import {
         TIME_END_TURN,
         TIME_NEXT_TURN,
         CITY_END_TURN,
         TIME_CITY_END_TURN,
         OPEN_BVG,
         ASK_BVG,
         SEESTRASSE_BVG,
         JETZT_BVG} from './mock-test-turn';

export const TEST_TIME: TestDialog = {
  name: 'Uhrzeitansage',
  turns: [TIME_END_TURN]
};

export const TEST_TIME_CITY: TestDialog = {
  name: 'Uhrzeitansage für eine Stadt',
  turns: [TIME_CITY_END_TURN]
};

export const TEST_TIME_DIALOG: TestDialog = {
  name: 'Uhrzeitansage im Kontext',
  turns: [TIME_NEXT_TURN, CITY_END_TURN]
};

export const TEST_BVG: TestDialog = {
  name: 'Fahrauskunpft_der_BVG',
  turns: [OPEN_BVG, ASK_BVG, SEESTRASSE_BVG, JETZT_BVG]
};

// export const TEST_VUI: TestDialog = {
//   name: 'Designing_VUI_Sample',
//   turns: [PRAESIDENT, AGE_DEAD, PLACE_OF_BIRTH, RESTAURANT]
// };
