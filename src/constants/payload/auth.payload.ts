export interface LoginRequestPayload {
 email: string;
 password: string;
}
export interface ResendMailPayload {
 id: string;
}
export interface CreateEmailPayload {
 idUser: string;
 subject: string;
 title: string;
 message: string;
}
