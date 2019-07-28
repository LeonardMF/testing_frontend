import { CriteriaEntity } from '../criteria-entity/criteria-entity';

export class Criteria {
  intent?: string;
  minConfidence?: number;
  entities?: CriteriaEntity[] = [];
}
