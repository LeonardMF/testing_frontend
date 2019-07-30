import { CriteriaEntity } from '../criteria-entity/criteria-entity';
import { TestTurn } from '../test-turn/test-turn';

export class Criteria {
  intent?: string;
  minConfidence?: number;
  nextTurn?: string;
  entities?: CriteriaEntity[] = [];
}
