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

export type AuthReducerActionsType = setUserLoginDataActionType;

