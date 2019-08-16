import { Criteria } from '../criteria/criteria';
import { Result } from '../result/result';

export class TestCase {
  name: string;
  wakeword: string;
  prompt: string;
  response: string;
  criteria: Criteria;
  result: Result;
}
