import { TestTurn } from './test-turn/test-turn';

export class TestDialog {
  name: string;
  description: string;
  turns?: TestTurn[] = [];
}

