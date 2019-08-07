
import { TestCase } from './test-case';

import { TIME_END_CRITERIA,
         TIME_NEXT_CRITERIA,
         TIME_CITY_END_CRITERIA} from './mock-test-criteria';
import { TIME_RESULT, RIGHT_RESULT, WRONG_RESULT } from './mock-result';



export const TIME_GOOLGE: TestCase = {
  name: 'start',
  wakeword: 'OK Google',
  prompt: 'wie viel Uhr ist es?',
  response: 'Es ist 10:30 Uhr',
  criteria: TIME_NEXT_CRITERIA,
  result: TIME_RESULT
};

export const TIME_LISSABON_GOOLGE: TestCase = {
  name: 'next',
  wakeword: 'OK Google',
  prompt: 'und in Lissabon?',
  response: 'Es ist 9:30 Uhr in Lissabon, Protugal',
  criteria: TIME_CITY_END_CRITERIA,
  result: RIGHT_RESULT
};

export const TIME_ALEXA: TestCase = {
  name: 'start',
  wakeword: 'Alexa',
  prompt: 'wie viel Uhr ist es?',
  response: 'Es ist 10:30 Uhr',
  criteria: TIME_NEXT_CRITERIA,
  result: TIME_RESULT
};

export const TIME_LISSABON_ALEXA: TestCase = {
  name: 'next',
  wakeword: 'Alexa',
  prompt: 'und in Lissabon?',
  response: 'Es ist 10:30 Uhr',
  criteria: TIME_CITY_END_CRITERIA,
  result: WRONG_RESULT
};
