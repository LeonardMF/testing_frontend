import { CriteriaEntity } from './criteria-entity/criteria-entity';

export const TIME_ENTITY: CriteriaEntity = {
  name: 'time',
  minConfidence: 0.75,
  value: 'checkTime',
  flag: false
};

export const TIME_LISSABON_ENTITY: CriteriaEntity = {
  name: 'time',
  minConfidence: 0.75,
  value: 'checkTime-1',
  flag: false
};

export const CITY_ENTITY: CriteriaEntity = {
  name: 'city',
  minConfidence: 0.75,
  value: 'lissabon',
  flag: false
};

// BVG SKILL
export const STATION_FROM_ENTITY: CriteriaEntity = {
  name: 'station_from',
  minConfidence: 0.75,
  value: 'seestraße',
  flag: false
};

export const STATION_TO_ENTITY: CriteriaEntity = {
  name: 'station_to',
  minConfidence: 0.75,
  value: 'Ernst-Reuter-Platz',
  flag: false
};

// VUI
export const LINCOLN_NAME_ENTITY: CriteriaEntity = {
  name: 'name',
  minConfidence: 0.75,
  value: 'abraham lincoln',
  flag: false
};

export const LINCOLN_AGE_DEAD_ENTITY: CriteriaEntity = {
  name: 'age',
  minConfidence: 0.75,
  value: '56',
  flag: false
};

export const HODGENVILLE_CITY_ENTITY: CriteriaEntity = {
  name: 'city',
  minConfidence: 0.75,
  value: 'hodgenville',
  flag: false
};
