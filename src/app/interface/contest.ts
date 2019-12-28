export interface Contest<T = Date> {
    cid: string;
    name: string;
    uid: string;
    start_time: T;
    block_time: T;
    end_time: T;
    status: 0 | 1 | 2;
    participants: number;
    penalty: number;
    count: number;
}