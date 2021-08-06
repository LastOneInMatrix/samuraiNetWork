import {ACTIONS_TYPE, AuthReducerActionsType} from "./actions";


export type AuthInitialStateType = {
    id: number | null;
    login: string | null;
    email: string | null;
    authorization: boolean;
}

const initialState: AuthInitialStateType = {
    id: null,
    login: null,
    email: null,
    authorization: false,

}

export const authReducer = (state: AuthInitialStateType = initialState, action: AuthReducerActionsType):AuthInitialStateType  => {
        switch (action.type) {
            case ACTIONS_TYPE.SET_USER_DATA:
                return {
                    ...state,
                    ...action.payload,
                }
            default: return state;
        }
}