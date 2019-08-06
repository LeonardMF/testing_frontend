import { Criteria } from './criteria/criteria';
import { Result } from './result/result';

export class TestResult {

  wakeword: string;
  prompt: string;
  response: string;
  criteria: Criteria;
  result: Result;
}
