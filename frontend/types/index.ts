export interface AbstractUser {
    refresh: string;
    access:  string;
    user:    User;
}

export interface User {
    id:             number;
    name:           string  | null;
    email:          string;
    image:          string  | null;
    email_verified: boolean | null;
}

export interface SessionUser { 
    id:             number;
    name:           string  | null;
    email:          string;
    image:          string  | null;
    tokens: {
        refreshToken:    string;
        accessToken:     string;
    }
}