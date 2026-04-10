import { UserAuthInfo } from "@/interfaces/UserAuth";

export type { UserAuthInfo };

export interface LoginResponse {
    success: boolean;
    token: string;
    refreshToken: string;
    id: string;
    email: string;
    name: string;
    plan: string;
    trial: boolean;
    trialDaysLeft: number;
    paymentStatus: string;
    trialStartDate: string | null;
    roles: string[];
    appFirstAccessCompleted: boolean;
    notificationsEnabled: boolean;
    signupSource: string;
    phone: string
}

export interface GoogleLoginInput {
    idToken: string;
    accessToken: string
}

export interface AuthState {
    isAuthenticated: boolean;
    userId: string | null;
    roles: string[];
    lastLogin: number | null;
}

export interface LoginResult {
    success: boolean;
    error?: string;
    redirectTo?: string;
    user?: LoginResponse
    status?: number;
}