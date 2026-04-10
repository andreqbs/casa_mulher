export interface UserLogInput {
    message: string;
    meta?: {
        userId: number | string;
        paymentStatus?: string;
        plan?: string;
        email?: string;
    };
}
