export interface User{
    id: number;
    admin: boolean;
    banned: boolean;
    deleted: boolean;
    login: string;
    passwordHash: string;
    registrationDate: Date;
    userInfo: UserInfo;
}

export interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    patronymicName: string;
    profileImageSource: string;
    sex: string;
    biography: string;
    phone: string;
    email: string;
    dateOfBirth: Date;
}

export interface UpdateUserModel {
    id: number,
    login: string,
    sex: string,
    email: string,
    phone: string,
    dateOfBirth: Date,
    biography: string,
    firstName: string,
    lastName: string,
    patronymicName: string
}