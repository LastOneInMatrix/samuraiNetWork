import {ActionsType, AppDispatch, AppStateType} from "./redux-store";
import {login, logOut} from "../API/requestAPI";
import {getUserLoginDataThunkCreator, setAuthUserLoginData} from "./authReducer/actions";
import {ThunkDispatch} from "redux-thunk";


export enum ACTIONS_TYPE {
    SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA',
}
export type LoginPageType = {
    "email": string,
    "password": string,
    "rememberMe": boolean,
    "errorMessage": string
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
export const setErrorMessages = (message: string) => {
    return {
        type: 'SET_ERROR_MESSAGES',
        message
    } as const
}
export type setErrorMessagesACType = ReturnType<typeof setErrorMessages>


export const setUserLoginDataThunk = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch:  ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        login(email, password, rememberMe)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(getUserLoginDataThunkCreator());
                    dispatch(setUserLoginData(email, password, rememberMe));
                }
                else {
                    dispatch(setErrorMessages(res.data.messages[0]));
                }
              }
            )
    }
};



export const logOutUserThunk = () => {
    return (dispatch:  ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        logOut().then( res => {
            if(res.data.resultCode === 0) {
                dispatch(setAuthUserLoginData(null, null, null, false));
                dispatch(setUserLoginData('', '', false));
                dispatch(setErrorMessages(''));
                }
            }
        )
    }
}



let initialState: LoginPageType = {
    "email": '',
    "password": '',
    "rememberMe": false,
    'errorMessage': ''
}
export const loginReducer = (state: LoginPageType=initialState, action: ActionsType):LoginPageType => {
            switch(action.type) {
                case ACTIONS_TYPE.SET_USER_LOGIN_DATA: {
                    return {
                        ...state,
                        ...action.payload
                    }
                }
                case "SET_ERROR_MESSAGES": {
                    return {
                        ...state,
                        errorMessage: action.message
                    }
                }
            }
            return state;
}
