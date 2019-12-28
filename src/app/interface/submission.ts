export type JudgeStatus = "ING" | "AC" | "WA" | "CE" | "RE" | "TLE" | "MLE" | "NO";

export interface SubmissionLite {
  sid: string;
  uid: string;
  tid: string;
  question_title: string;
  status: JudgeStatus;
  language: string;
  time_used: number;
  space_used: number | string;
  created_at: Date;
}

export interface ContestSubmission<T = string> {
  sid: string;
  uid: string;
  tid: string;
  status: number;
  created_at: T;
  total_time: number;
}

export interface Submission extends SubmissionLite {
  sid: string;
  uid: string;
  tid: string;
  question_title: string;
  status: JudgeStatus;
  language: string;
  time_used: number;
  space_used: number | string;
  created_at: Date;
  judge: Array<JudgeResult>;
}

export interface JudgeResult {
  status: JudgeStatus;
  time_used: number;
  space_used: number;
}
