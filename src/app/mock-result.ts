
import { Result } from './result/result';

import { GET_TIME_76_NEXT,
         GET_TIME_76_END} from './mock-rasa-intent';
import { TIME_NOW,
         TIME_WRONG,
         TIME_RIGHT,
         CITY_LISSABON} from './mock-rasa-entity';
import { CITY_ENTITY } from './mock-test-criteria-entity';

export const TIME_RESULT: Result = {
  intent: GET_TIME_76_NEXT,
  entities: [TIME_NOW],
  nextTurnFlag: true
};

export const RIGHT_RESULT: Result = {
  intent: GET_TIME_76_END,
  entities: [TIME_RIGHT, CITY_LISSABON],
  nextTurnFlag: true
};

export const WRONG_RESULT: Result = {
  intent: GET_TIME_76_END,
  entities: [TIME_WRONG],
  missingEntities: [CITY_ENTITY],
  nextTurnFlag: false
};
