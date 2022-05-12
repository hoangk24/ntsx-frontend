import { Role } from "constants/models/auth.model";

export interface CreateUserRequest {
 email: string;
 password: string;
 fullName: string;
}

export interface CreateEmailValueForm {
 subject: string;
 message: string;
 title: string;
}

export interface ChangeRolePayload {
 id: string;
 role: Role;
}

export interface ActiveMailPayload {
 id: string;
}
export interface ChangePasswordPayload {
 token: string;
 email: string;
}
export interface ForgotPasswordPayload {
 email: string;
}
export interface UpdatePasswordPayload {
 oldPassword: string;
 newPassword: string;
}
export interface UpdateInformationPayload {
 data: any;
}
