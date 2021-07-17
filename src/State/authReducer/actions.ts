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
    }
}

export const setUserLoginData = (id: number|null, login: string|null, email: string|null): setUserLoginDataActionType => {
    return {
        type: ACTIONS_TYPE.SET_USER_DATA,
        payload: {id, login, email}
    }
}
export const getUserLoginDataThunkCreator = () => {
    return (dispatch: AppDispatch) => {
        debugger;
        getLoginInformationForHeader().then(response => {
            const {id, login, email} = response.data.data;
            dispatch(setUserLoginData(id, login, email));
        }); // компонент был вмантирован в DOM
    }
}

export type AuthReducerActionsType = setUserLoginDataActionType;

