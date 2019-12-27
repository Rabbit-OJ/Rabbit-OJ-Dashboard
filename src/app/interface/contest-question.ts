import { Sample } from "./sample";

export interface ContestQuestion {
  cid: string;
  tid: string;
  id: string;
  score: number;
  uid: string;
  subject: string;
  difficulty: 0 | 1 | 2;
  time_limit: number;
  space_limit: number;
  created_at: string;
  content: string;
  sample: Array<Sample>;
  attempt: number;
  accept: number;
}
