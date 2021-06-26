import {ActionsType} from "./redux-store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

// export type locationType = {
//     country: string;
//     city: string;
// }
export type userType = {
    photos: {
        small: string | null;
        large: string | null
    };
    followed: boolean;
    id: number;
    name: string;
    status: string | null;
}
export type usersType = Array<userType>

const initialState = {
    users: [] as Array<userType>  // todo узнать как правильно типизировать для инитиал стейта
}


export type initialStateType = typeof initialState;

export const usersReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: state.users.map(user => {
                    console.log(action.userId === user.id);
                   return  action.userId === user.id ? {...user, followed: true} : user     // потому что если написать   follower то ошибки не будет?
                })
            }
        }

        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(user => action.userId === user.id ? {...user, followed: false} : user)
            }
        }

        case 'SET_USERS': {
            let a = {
                ...state,
                users: [...state.users, ...action.users] // todo если изночальный тоже раскидывать то дважды почему?
            }
            debugger
            return a
        }

        default:
            return state;
    }
}
export const followAC = (userId: number) => ({type: FOLLOW, userId} as const);
export const unFollowAC = (userId: number) => ({type: UNFOLLOW, userId} as const);
export const setUsersAC = (users: usersType) => ({type: SET_USERS, users} as const);


