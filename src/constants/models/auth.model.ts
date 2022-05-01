export interface IUser {
 _id: string;
 email: IEmail;
 password: string;
 fullName: string;
 role: Role;
 avatar: string;
}
export interface IEmail {
 _id: string;
 email: string;
 verified: boolean;
}

export enum Role {
 "ADMIN" = 1,
 "USER" = 2,
}
