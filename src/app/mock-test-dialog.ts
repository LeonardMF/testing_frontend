import { TestDialog } from './test-dialog';
import {
         TIME_END_TURN,
         TIME_NEXT_TURN,
         CITY_END_TURN,
         TIME_CITY_END_TURN,
         OPEN_BVG,
         ASK_BVG,
         SEESTRASSE_BVG,
         JETZT_BVG,
         PRAESIDENT,
         AGE_DEAD,
         PLACE_OF_BIRTH,
         RESTAURANT} from './mock-test-turn';

export const TEST_TIME: TestDialog = {
  name: 'TEST_TIME',
  description: 'Uhrzeitansage',
  turns: [TIME_END_TURN]
};

export const TEST_TIME_CITY: TestDialog = {
  name: 'TEST_TIME_CITY',
  description: 'Uhrzeitansage für eine Stadt',
  turns: [TIME_CITY_END_TURN]
};

export const TEST_TIME_DIALOG: TestDialog = {
  name: 'TEST_TIME_DIALOG',
  description: 'Uhrzeitansage im Kontext',
  turns: [TIME_NEXT_TURN, CITY_END_TURN]
};

export const TEST_BVG: TestDialog = {
  name: 'TEST_BVG',
  description: 'Fahrauskunpft der BVG',
  turns: [OPEN_BVG, ASK_BVG, SEESTRASSE_BVG, JETZT_BVG]
};

export const TEST_VUI: TestDialog = {
  name: 'TEST_VUI',
  description: 'Designing VUI Sample Dialog',
  turns: [PRAESIDENT, AGE_DEAD, PLACE_OF_BIRTH, RESTAURANT]
};
