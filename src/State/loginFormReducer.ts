import {ActionsType, AppDispatch} from "./redux-store";
import {login, logOut} from "../API/requestAPI";
import {getUserLoginDataThunkCreator, setAuthUserLoginData} from "./authReducer/actions";


export enum ACTIONS_TYPE {
    SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA',
}
export type LoginPageType = {
    "email": string,
    "password": string,
    "rememberMe": boolean
};
type setUserLoginDataActionType = {
    type: ACTIONS_TYPE.SET_USER_LOGIN_DATA,
    payload: {
        "email": string,
        "password": string,
        "rememberMe": boolean
    }
}
export const setUserLoginData = (email: string, password: string, rememberMe: boolean): setUserLoginDataActionType => {
    return {
        type: ACTIONS_TYPE.SET_USER_LOGIN_DATA,
        payload: {email, password, rememberMe}
    }
};
export const setUserLoginDataThunk = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: AppDispatch) => {
        login(email, password, rememberMe)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    //@ts-ignore
                    dispatch(getUserLoginDataThunkCreator());
                    dispatch(setUserLoginData(email, password, rememberMe));
                }
              }
            )
    }
};

export const logOutUserThunk = () => {
    return (dispatch: AppDispatch) => {
        logOut().then( res => {
            if(res.data.resultCode === 0) {
                dispatch(setUserLoginData('', '', false));
                dispatch(setAuthUserLoginData(null, null, null, false));
                }
            }
        )
    }
}



let initialState: LoginPageType = {
    "email": '',
    "password": '',
    "rememberMe": false
}
export const loginReducer = (state: LoginPageType=initialState, action: ActionsType):LoginPageType => {
            switch(action.type) {
                case ACTIONS_TYPE.SET_USER_LOGIN_DATA: {
                    return {
                        ...state,
                        ...action.payload
                    }
                }
            }
            return state;
}
