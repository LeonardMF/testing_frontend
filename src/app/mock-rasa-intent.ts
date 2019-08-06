
import { RasaNluIntent } from './rasa-nlu-intent/rasa-nlu-intent';

export const GET_TIME_74: RasaNluIntent = {
  name: 'getTime',
  confidence: 0.74,
  nameFlag: true,
  confidenceFlag: false
};

export const GET_TIME_76_NEXT: RasaNluIntent = {
  name: 'getTime',
  confidence: 0.76,
  nextTurn: 'next',
  nameFlag: true,
  confidenceFlag: true
};

export const GET_TIME_76_END: RasaNluIntent = {
  name: 'getTime',
  confidence: 0.76,
  nextTurn: 'end',
  nameFlag: true,
  confidenceFlag: true
};

export const NO_RESPONSE_76: RasaNluIntent = {
  name: 'noResponse',
  confidence: 0.76,
  nameFlag: false,
  confidenceFlag: true
};
