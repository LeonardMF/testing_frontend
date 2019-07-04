import { TestCriteriaEntity } from './test-criteria-entity';

export const TIME_ENTITY: TestCriteriaEntity = {
  name: 'time',
  confidence: 0.75,
  value: 'checkTime',
  flag: false
};

export const TIME_LISSABON_ENTITY: TestCriteriaEntity = {
  name: 'time',
  confidence: 0.75,
  value: 'checkTime-1',
  flag: false
};

export const CITY_ENTITY: TestCriteriaEntity = {
  name: 'city',
  confidence: 0.75,
  value: 'lissabon',
  flag: false
};

// BVG SKILL
export const STATION_FROM_ENTITY: TestCriteriaEntity = {
  name: 'station_from',
  confidence: 0.75,
  value: 'seestraße',
  flag: false
};

export const STATION_TO_ENTITY: TestCriteriaEntity = {
  name: 'station_to',
  confidence: 0.75,
  value: 'Ernst-Reuter-Platz',
  flag: false
};

// VUI
export const LINCOLN_NAME_ENTITY: TestCriteriaEntity = {
  name: 'name',
  confidence: 0.75,
  value: 'abraham lincoln',
  flag: false
};

export const LINCOLN_AGE_DEAD_ENTITY: TestCriteriaEntity = {
  name: 'age',
  confidence: 0.75,
  value: '56',
  flag: false
};

export const HODGENVILLE_CITY_ENTITY: TestCriteriaEntity = {
  name: 'city',
  confidence: 0.75,
  value: 'hodgenville',
  flag: false
};
