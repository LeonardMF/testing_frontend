export class RasaNluEntity {
  start?: number;
  end?: number;
  text?: string;
  value: string;
  confidence: number;
  entity: string;
  extractor?: string;
  valueFlag?: boolean;
  confidenceFlag?: boolean;
  entityFlag?: boolean;
}
