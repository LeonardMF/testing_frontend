
import { Result } from './result/result';

import { GET_TIME_74,
         GET_TIME_76,
         NO_RESPONSE_76 } from './mock-rasa-intent';
import { TIME_74,
         TIME_76,
         CITY_LISSABON} from './mock-rasa-entity';

export const FULL_RESULT: Result = {
  intent: GET_TIME_76,
  entities: [TIME_76, CITY_LISSABON],
  nextTurnFlag: true
};

export const CONFIDENCE_RESULT: Result = {
  intent: GET_TIME_74,
  entities: [TIME_76, CITY_LISSABON],
  nextTurnFlag: false
};

export const TIME_RESULT: Result = {
  intent: GET_TIME_76,
  entities: [TIME_76],
  nextTurnFlag: false
};

export const NO_RESULT: Result = {
  intent: NO_RESPONSE_76,
  entities: [],
  nextTurnFlag: false
};

