
import { Criteria } from './criteria/criteria';

import { TIME_ENTITY,
         CITY_ENTITY,
         TIME_LISSABON_ENTITY,
         STATION_TO_ENTITY,
         STATION_FROM_ENTITY,
         LINCOLN_NAME_ENTITY,
         HODGENVILLE_CITY_ENTITY,
         LINCOLN_AGE_DEAD_ENTITY} from './mock-test-criteria-entity';

export const TIME_END_CRITERIA: Criteria = {
  intent: 'getTime',
  minConfidence: 0.75,
  nextTurn: 'end',
  entities: [TIME_ENTITY]
};

export const TIME_NEXT_CRITERIA: Criteria = {
  intent: 'getTime',
  minConfidence: 0.75,
  nextTurn: 'next',
  entities: [TIME_ENTITY]
};

export const TIME_CITY_END_CRITERIA: Criteria = {
  intent: 'getTime',
  minConfidence: 0.75,
  nextTurn: 'end',
  entities: [TIME_LISSABON_ENTITY, CITY_ENTITY]
};

// BVG SKILL
export const GREETING_CRITERIA: Criteria = {
  intent: 'greeting',
  minConfidence: 0.75,
  nextTurn: 'request_connection',
  entities: []
};

export const REQUEST_SATION_FROM_CRITERIA: Criteria = {
  intent: 'requestStation',
  minConfidence: 0.75,
  nextTurn: 'station_from',
  // entities: [STATION_TO_ENTITY]
  entities: []
};

export const CONNECTION_CRITERIA: Criteria = {
  intent: 'connection',
  minConfidence: 0.75,
  nextTurn: 'end',
  entities: [STATION_FROM_ENTITY, STATION_TO_ENTITY]
};

export const DEPARTURE_TIME_CRITERIA: Criteria = {
  intent: 'requestTime',
  minConfidence: 0.75,
  nextTurn: 'departure_time',
  // entities: [STATION_FROM_ENTITY]
  entities: []
};

// VUI
export const PRAESIDENT_CRITERIA: Criteria = {
  intent: 'getPresident',
  minConfidence: 0.75,
  nextTurn: 'age_dead',
  entities: [LINCOLN_NAME_ENTITY]
};

export const AGE_DEAD_CRITERIA: Criteria = {
  intent: 'getAgeDead',
  minConfidence: 0.75,
  nextTurn: 'place_of_birth',
  entities: [LINCOLN_NAME_ENTITY, LINCOLN_AGE_DEAD_ENTITY]
};

export const CITY_BORN_CRITERIA: Criteria = {
  intent: 'getCityBorn',
  minConfidence: 0.75,
  nextTurn: 'restaurant',
  entities: [HODGENVILLE_CITY_ENTITY]
};

export const RESTAURANT_CRITERIA: Criteria = {
  intent: 'getRestaurant',
  minConfidence: 0.75,
  nextTurn: 'end',
  entities: [HODGENVILLE_CITY_ENTITY]
};


