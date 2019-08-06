import { RasaNluEntity } from './rasa-nlu-entity/rasa-nlu-entity';

export const TIME_NOW: RasaNluEntity = {
  entity: 'time',
  confidence: 1,
  value: '2019-07-25T22:10:30.000+02:00',
  entityFlag: true,
  confidenceFlag: true,
  valueFlag: true
};

export const TIME_RIGHT: RasaNluEntity = {
  entity: 'time',
  confidence: 1,
  value: '2019-07-25T22:09:30.000+02:00',
  entityFlag: true,
  confidenceFlag: true,
  valueFlag: true
};

export const TIME_WRONG: RasaNluEntity = {
  entity: 'time',
  confidence: 1,
  value: '2019-07-25T22:10:30.000+02:00',
  entityFlag: true,
  confidenceFlag: true,
  valueFlag: false
};

export const CITY_LISSABON: RasaNluEntity = {
  entity: 'city',
  confidence: 0.76,
  value: 'lissabon',
  entityFlag: true,
  confidenceFlag: true,
  valueFlag: true
};

export const CITY_BERLIN: RasaNluEntity = {
  entity: 'city',
  confidence: 0.76,
  value: 'berlin',
  entityFlag: true,
  confidenceFlag: true,
  valueFlag: false
};
