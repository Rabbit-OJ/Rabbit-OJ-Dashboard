export interface Contest<T = Date> {
    cid: string;
    name: string;
    uid: string;
    startTime: T;
    blockTime: T;
    endTime: T;
    status: 0 | 1 | 2;
    participants: number;
    penalty: number;
    count: number;
}
