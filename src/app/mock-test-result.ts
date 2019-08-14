import { TestResult } from './test-result';
import { TIME_GOOLGE,
         TIME_LISSABON_GOOLGE,
         TIME_ALEXA,
        TIME_LISSABON_ALEXA } from './mock-test-case';

export const TEST_TIME_DIALOG_GOOGLE: TestResult = {
  dialogName: 'TEST_TIME_DIALOG',
  dialogDescription: 'Uhrzeitansage im Kontext',
  assistant: 'GOOGLE',
  datetime: '1565697164543',
  testcases: [TIME_GOOLGE, TIME_LISSABON_GOOLGE],
};

export const TEST_TIME_DIALOG_ALEXA: TestResult = {
  dialogName: 'TEST_TIME_DIALOG',
  dialogDescription: 'Uhrzeitansage im Kontext',
  assistant: 'ALEXA',
  datetime: '1565697164545',
  testcases: [TIME_ALEXA, TIME_LISSABON_ALEXA],
};


