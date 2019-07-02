import { TestCriteriaEntity } from './test-criteria-entity';

export class TestCriteria {
  intent: string;
  confidence: number;
  entities: TestCriteriaEntity[] = [];
}
