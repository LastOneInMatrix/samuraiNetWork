import {ActionsType, AppDispatch, AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {getUserLoginDataThunkCreator} from "./authReducer/actions";
import {ThunkDispatch} from "redux-thunk";
const initialState = {
    initialized: false
}
type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS": {
            return {...state, initialized: true}
        }
        default:
            return state;
    }
}
const initializedSuccess = () => {
    return {type: 'INITIALIZED_SUCCESS'} as const
}

export const initialize = () => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => { //типизация dispatch в том случае если будет санка диспатчиться внутри
        const promise = dispatch(getUserLoginDataThunkCreator())
        Promise.all([promise]).then(res => {
            dispatch(initializedSuccess())
        })

    }
}

export type initializedSuccessActionType = ReturnType<typeof initializedSuccess>