export interface User {
    displayName: string;
    userName?: string | null;
    token: string;
    image: string;
}

export interface UserFormValue {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}