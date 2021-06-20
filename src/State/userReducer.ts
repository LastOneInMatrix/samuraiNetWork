import {v1} from "uuid";
import {ActionsType} from "./redux-store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

export type locationType = {
    country: string;
    city: string;
}
export type userType = {
    img: string;
    follower: boolean;
    id: string;
    fullName: string;
    status: string;
    location: locationType;
}
export type usersType = Array<userType>

const initialState = {
    users: [] as usersType  // todo узнать как правильно типизировать для инитиал стейта
}
export type initialStateType = typeof initialState;

export const usersReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: state.users.map(user => action.userId === user.id ? {...user, follower: true} : user)
            }
        };
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(user => action.userId === user.id ? {...user, follower:false} : user)
            }
        };
        case 'SET_USERS': {
            return {
                ...state,
                users: [...action.users, ...state.users] // todo если изночальный тоже раскидывать то дважды почему?
            }
        };
        default:
            return state;
    }
}
export const followAC = (userId: string) => ({type: FOLLOW, userId} as const);
export const unFollowAC = (userId: string) => ({type: UNFOLLOW, userId} as const);
export const setUsersAC = (users: usersType) => ({type: SET_USERS, users} as const);


