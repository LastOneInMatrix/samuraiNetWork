import {ActionsType, AppDispatch} from "./redux-store";
import {getUser, setFollowUnfollow} from "../API/requestAPI";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_USER_PAGES = 'SET_USER_PAGES';
const GET_TOTAL_COUNT = 'GET_TOTAL_COUNT';
const SET_FETCHING = 'SET_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';


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
    users: [] as Array<userType>,
    totalSize: 0,
    pageSize: 20,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [18257],
}


type initialStateType = typeof initialState;

export const usersReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: state.users.map(user => {
                   return  action.userId === user.id ? {...user, followed: true} : user     // todo потому что если написать   follower то ошибки не будет?
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
            return {
                    ...state,
                    users: [...action.users] // todo если изночальный тоже раскидывать то дважды почему?
                }
        }
        case "SET_USER_PAGES": {
            return {...state, currentPage: action.page}
        }
        case "GET_TOTAL_COUNT": {
            return {...state, totalSize: action.totalSize}
        }
        case "SET_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING: {
            return {...state, followingInProgress: [...action.followingInProgress]}
        }
        default:
            return state;
    }
}
export const followHandler = (userId: number) => ({type: FOLLOW, userId} as const);
export const unFollowHandler = (userId: number) => ({type: UNFOLLOW, userId} as const);
export const setUsersHandler = (users: usersType) => ({type: SET_USERS, users} as const);
export const setUsersPage = (page: number) => ({type: SET_USER_PAGES, page} as const);
export const getTotalCount = (totalSize: number) => ({type: GET_TOTAL_COUNT, totalSize} as const);
export const setFetching = (isFetching: boolean) => ({type:SET_FETCHING, isFetching} as const);
export const setFollowing = (followingInProgress: Array<number>) => ({type:TOGGLE_IS_FOLLOWING, followingInProgress} as const);

export const getUserThunkCreator = (currentPage: number, pageSize: number) => {
   return (dispatch: AppDispatch) => {
       dispatch(setFetching(true));
       getUser(currentPage, pageSize).then((data) => {

           dispatch(setFetching(false));
           dispatch(setUsersHandler([...data.items]));
           dispatch(getTotalCount(data.totalCount));
           // компонент был вмантирован в DOM
       })
   }
}

export const followUnfollowThunkCreator = (user: userType, button: 'post' | 'delete') => {
    return (dispatch: AppDispatch) => {
        debugger;
        dispatch(setFollowing([user.id]));
        setFollowUnfollow(user.id, button)
            .then(({data}) => {
                // @ts-ignore
                data.resultCode === 0 && button === 'post' ? dispatch(followHandler(user.id)) : dispatch(unFollowHandler(user.id));
                dispatch(setFollowing([]));
            })
    }
}