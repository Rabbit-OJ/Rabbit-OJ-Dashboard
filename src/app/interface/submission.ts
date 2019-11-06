export type JudgeStatus = "ING" | "AC" | "WA" | "CE" | "RE" | "TLE" | "MLE";

export interface ISubmissionLite {
  sid: string;
  uid: string;
  tid: string;
  question_title: string;
  status: JudgeStatus;
  language: string;
  time_used: number;
  space_used: number;
  created_at: Date;
}

export interface ISubmission extends ISubmissionLite {
  sid: string;
  uid: string;
  tid: string;
  question_title: string;
  status: JudgeStatus;
  language: string;
  time_used: number;
  space_used: number;
  created_at: Date;
  judge: Array<IJudgeResult>;
}

export interface IJudgeResult {
  status: JudgeStatus;
  time_used: number;
  space_used: number;
}
