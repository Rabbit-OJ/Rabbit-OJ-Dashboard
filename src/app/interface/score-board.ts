export interface ScoreBoard {
    uid: string;
    username: string;
    score: number;
    total_time: number;
    rank: number;
    progress: Array<ScoreBoardProgress>;
}

export interface ScoreBoardProgress {
    status: 0 | -1| 1;
    bug: number;
    total_time: number;
}