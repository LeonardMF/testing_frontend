
import { TestCriteria } from './test-criteria';
import { TIME_ENTITY,
         CITY_ENTITY,
         TIME_LISSABON_ENTITY,
         STATION_TO_ENTITY,
         STATION_FROM_ENTITY,
         LINCOLN_NAME_ENTITY,
         HODGENVILLE_CITY_ENTITY,
         LINCOLN_AGE_DEAD_ENTITY} from './mock-test-criteria-entity';

export const TEST_TIME_CRITERIA: TestCriteria = {
  intent: 'getTime',
  confidence: 0.75,
  entities: [TIME_ENTITY]
};

export const TEST_TIME_CITY_CRITERIA: TestCriteria = {
  intent: 'getTime',
  confidence: 0.75,
  entities: [TIME_LISSABON_ENTITY, CITY_ENTITY]
};

export const TEST_CITY_CRITERIA: TestCriteria = {
  intent: 'getTime',
  confidence: 0.75,
  entities: [CITY_ENTITY]
};

// BVG SKILL
export const GREETING_CRITERIA: TestCriteria = {
  intent: 'greeting',
  confidence: 0.75,
  entities: []
};

export const REQUEST_SATION_FROM_CRITERIA: TestCriteria = {
  intent: 'request',
  confidence: 0.75,
  entities: [STATION_TO_ENTITY]
};

export const CONNECTION_CRITERIA: TestCriteria = {
  intent: 'connection',
  confidence: 0.75,
  entities: [STATION_FROM_ENTITY, STATION_TO_ENTITY]
};

// VUI
export const PRAESIDENT_CRITERIA: TestCriteria = {
  intent: 'getPresident',
  confidence: 0.75,
  entities: [LINCOLN_NAME_ENTITY]
};

export const AGE_DEAD_CRITERIA: TestCriteria = {
  intent: 'getAgeDead',
  confidence: 0.75,
  entities: [LINCOLN_NAME_ENTITY, LINCOLN_AGE_DEAD_ENTITY]
};

export const CITY_BORN_CRITERIA: TestCriteria = {
  intent: 'getCityBorn',
  confidence: 0.75,
  entities: [HODGENVILLE_CITY_ENTITY]
};

export const RESTAURANT_CRITERIA: TestCriteria = {
  intent: 'getRestaurant',
  confidence: 0.75,
  entities: [HODGENVILLE_CITY_ENTITY]
};


