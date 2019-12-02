export interface QuestionItem {
  tid: string;
  uid: string;
  subject: string;
  attempt: number;
  accept: number;
  difficulty: number;
  time_limit: number;
  space_limit: number;
  created_at: Date;
}

export type QuestionListResponse = {
  list: Array<QuestionItem>;
  count: number;
};
