export interface LoginFormData {
    username: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
}

export interface SessionData {
    username: string;
    timestamp: number;
}