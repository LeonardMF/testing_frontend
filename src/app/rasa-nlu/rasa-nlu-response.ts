
import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';
import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';

export class RasaNluResponse {
  intent: RasaNluIntent;
  entities: RasaNluEntity[];
  intent_ranking: RasaNluIntent[];
  text: string;
  project: string;
  model: string;
}
