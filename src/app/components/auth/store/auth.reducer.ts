import { User } from 'src/app/models/user.model';
import * as AuthActions  from './auth.action';

const authState : State = {
    user : null,
    loadingAuth: false,
    errorsAuth : ''
};


export interface State {
    user : User,
    loadingAuth: boolean,
    errorsAuth : string
}

export function AuthReducer(state = authState, actions : AuthActions.AuthActions) {
    switch(actions.type) {

        case AuthActions.LOGIN :
        const user = new User(actions.payload.email, actions.payload.localId, actions.payload.token, actions.payload.expDate);
        return {...state, user, loadingAuth: false};
        break;

        case AuthActions.LOGOUT:
        return {...state, user : null};
        break;

        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:

        return {...state, loadingAuth: true, errorsAuth : null};
    
        break;

        case AuthActions.LOGIN_FAIL:
        return {...state, errorsAuth : actions.payload, user: null, loadingAuth: false};
        break;

        case AuthActions.CLEAR_ERROR:
        return {...state, errorsAuth: null}
        break;
        
        default:
        return state;
    }
}