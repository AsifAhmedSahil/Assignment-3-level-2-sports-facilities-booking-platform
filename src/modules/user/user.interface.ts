import { USER_Role } from "./user.contant";

export interface TUser  {
    name:string;
    email:string;
    password:string;
    phone:string;
    role: 'user'|'admin' ;
    address:string

}

export type TUser_Role = keyof typeof USER_Role
