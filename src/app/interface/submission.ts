export type JudgeStatus = "ING" | "AC" | "WA" | "CE" | "RE" | "TLE" | "MLE" | "NO";

export interface SubmissionLite<T = string> {
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

export interface Submission<T = string> extends SubmissionLite<T> {
  sid: string;
  uid: string;
  tid: string;
  question_title: string;
  status: JudgeStatus;
  language: string;
  time_used: number;
  space_used: T;
  created_at: Date;
  judge: Array<JudgeResult>;
}

export interface JudgeResult {
  status: JudgeStatus;
  time_used: number;
  space_used: number;
}
