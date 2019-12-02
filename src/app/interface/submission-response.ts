import { ISubmissionLite } from './submission';

export interface SubmissionResponse {
    list: Array<ISubmissionLite>;
    count: number;
}
