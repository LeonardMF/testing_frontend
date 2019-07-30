import { Criteria } from '../criteria/criteria';

export class TestTurn {
  name?: string;
  wakeword?: string;
  prompt: string;
  testCriteria?: Criteria;
  criterias?: Criteria[];
}
