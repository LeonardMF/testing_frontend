import { TestDialog } from './test-dialog';
import { TEST_TIME_CASE,
         TEST_CITY_CASE,
         ASK_BVG,
         SEESTRASSE_BVG,
         OPEN_BVG,
         PRAESIDENT,
         PLACE_OF_BIRTH,
         RESTAURANT,
         AGE_DEAD} from './mock-test-case';

export const TEST_TIME_DIALOG: TestDialog = {
  name: 'Uhrzeitansage',
  cases: [TEST_TIME_CASE, TEST_CITY_CASE]
};

export const TEST_TIME: TestDialog = {
  name: 'Uhrzeitansage',
  cases: [TEST_TIME_CASE]
};

export const TEST_BVG: TestDialog = {
  name: 'Fahrauskunpft der BVG',
  cases: [OPEN_BVG, ASK_BVG, SEESTRASSE_BVG]
};

export const TEST_VUI: TestDialog = {
  name: 'Designing VUI Sample',
  cases: [PRAESIDENT, AGE_DEAD, PLACE_OF_BIRTH, RESTAURANT]
};
