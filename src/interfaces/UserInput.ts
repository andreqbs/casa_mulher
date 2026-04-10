export default interface UserInput {
    name: string;
    birthday?: string;
    gender: string;
    cel: string;
    email: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: string;
    frequence?: number;
    approved: boolean;
    policy: boolean;
    newsletter: boolean;
    roles: string[];
    token?: string;
    refreshToken?: string;
    trialDays?: number;
    trial: boolean;
    trialCampaign?: string;
    trialStartDate?: string;
    paymentStatus?: string;
    firstDiagnosticAlreadyDone: boolean;
    createdAt: string;
    updatedAt: string;
    userType: string;
    isFromApp?: boolean;
}
