import { Criteria } from './criteria/criteria';
import { Result } from './result/result';
import { TestCase } from './test-case/test-case';

export class TestResult {
  dialogName: string;
  dialogDescription: string;
  assistant: string;
  datetime: string;
  testcases: TestCase[];
}
