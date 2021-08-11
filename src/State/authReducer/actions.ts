import {AppDispatch} from "../redux-store";
import {getLoginInformationForHeader} from "../../API/requestAPI";

export enum ACTIONS_TYPE {
    SET_USER_DATA = 'SET_USER_DATA',
}

type setUserLoginDataActionType = {
    type: ACTIONS_TYPE.SET_USER_DATA,
    payload: {
        "id": number|null,
        "login": string|null,
        "email": string|null
        authorization: boolean
    }
}

export const setAuthUserLoginData = (id: number|null, login: string|null, email: string|null,  authorization: boolean): setUserLoginDataActionType => {
    return {
        type: ACTIONS_TYPE.SET_USER_DATA,
        payload: {id, login, email,  authorization}
    } as const
}


export const getUserLoginDataThunkCreator = () => {
    return (dispatch: AppDispatch) => {
        return getLoginInformationForHeader().then(response => {
            if(response.data.resultCode === 0) {
                const {id, login, email} = response.data.data;
                dispatch(setAuthUserLoginData(id, login, email, true));
            }
        }); // компонент был вмантирован в DOM
    }
}

export type AuthReducerActionsType = setUserLoginDataActionType;

