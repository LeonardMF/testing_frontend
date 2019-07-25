import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';
import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';

export class Result {
  intent: RasaNluIntent;
  entities: RasaNluEntity[] = [];
}
