export interface Contest {
    name: string;
    startTime: Date;
    blockTime: Date;
    endTime: Date;
    status: 0 | 1 | 2;
    participants: number;
    penalty: number;
}
