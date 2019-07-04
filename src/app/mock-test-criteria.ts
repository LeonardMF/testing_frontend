
import { TestCriteria } from './test-criteria';
import { TIME_ENTITY,
         CITY_ENTITY,
         TIME_LISSABON_ENTITY,
         STATION_TO_ENTITY,
         STATION_FROM_ENTITY} from './mock-test-criteria-entity';

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
