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
