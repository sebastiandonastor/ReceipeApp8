import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_START = '[Auth] Login_Start';
export const LOGIN_FAIL = '[Auth] Login_Fail';
export const SIGNUP_START = '[Auth] Sign Up';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload : {email: string, localId: string, token : string, expDate : Date}) {

    }

}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload : {email : string, password : string}) {

    }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload : string) {

    }
}

export class SignUpStart implements Action {
    readonly type = SIGNUP_START;
    
    constructor(public payload : {email : string, password : string}) {

    }
}

export class ClearErrors implements Action {
    readonly type = CLEAR_ERROR;

    
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = Login | Logout | 
LoginStart | LoginFail | SignUpStart | 
ClearErrors | AutoLogin ;