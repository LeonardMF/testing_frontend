import { Criteria } from './criteria/criteria';
import { RasaNluIntent } from './rasa-nlu-intent/rasa-nlu-intent';
import { RasaNluEntity } from './rasa-nlu-entity/rasa-nlu-entity';

export class TestResult {

  wakeword: string;
  prompt: string;
  response: string;
  criteria: Criteria;
  intent: RasaNluIntent;
  entities: RasaNluEntity[] = [];
}
