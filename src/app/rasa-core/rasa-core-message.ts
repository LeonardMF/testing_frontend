import { RasaNluResponse } from '../rasa-nlu/rasa-nlu-response';

export class RasaCoreMessage {
  text: string;
  sender: string;
  parse_data: RasaNluResponse;
}
