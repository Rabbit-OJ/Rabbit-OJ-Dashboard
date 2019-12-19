export type JudgeStatus = "ING" | "AC" | "WA" | "CE" | "RE" | "TLE" | "MLE" | "NO";

export interface ISubmissionLite<T = string> {
  sid: string;
  uid: string;
  tid: string;
  question_title: string;
  status: JudgeStatus;
  language: string;
  time_used: number;
  space_used: T;
  created_at: Date;
}

export interface ISubmission<T = string> extends ISubmissionLite<T> {
  sid: string;
  uid: string;
  tid: string;
  question_title: string;
  status: JudgeStatus;
  language: string;
  time_used: number;
  space_used: T;
  created_at: Date;
  judge: Array<IJudgeResult>;
}

export interface IJudgeResult {
  status: JudgeStatus;
  time_used: number;
  space_used: number;
}
