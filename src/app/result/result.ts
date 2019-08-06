import { RasaNluEntity } from '../rasa-nlu-entity/rasa-nlu-entity';
import { RasaNluIntent } from '../rasa-nlu-intent/rasa-nlu-intent';
import { CriteriaEntity } from '../criteria-entity/criteria-entity';

export class Result {
  intent: RasaNluIntent;
  entities: RasaNluEntity[] = [];
  missingEntities?: CriteriaEntity[] = [];
  nextTurnFlag?: boolean;
}
