import {Team} from './Team';

export interface Match {
  id: string;
  group: number;
  teams: Team[];
  score: number[];
  name: string;
  isCompleted: boolean;
}
