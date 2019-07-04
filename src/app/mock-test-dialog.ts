import { TestDialog } from './test-dialog';
import { TEST_TIME_CASE,
         TEST_CITY_CASE,
         ASK_BVG,
         SEESTRASSE_BVG,
         OPEN_BVG } from './mock-test-case';

export const TEST_TIME_DIALOG: TestDialog = {
  name: 'Uhrzeitansage',
  cases: [TEST_TIME_CASE, TEST_CITY_CASE]
};

export const TEST_TIME: TestDialog = {
  name: 'Uhrzeitansage',
  cases: [TEST_TIME_CASE]
};

// export const TESTVUI: TestDialog = {
//   name: 'Beispiel aus Designing VUI',
//   cases: [TESTTIMECASE]
// };

export const TEST_BVG: TestDialog = {
  name: 'Fahrauskunpft der BVG',
  cases: [OPEN_BVG, ASK_BVG, SEESTRASSE_BVG]
};
