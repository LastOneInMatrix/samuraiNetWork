import {ActionsType, AppDispatch} from "./redux-store";
import {PostPropsType} from "../Components/Content/Posts/Post";
import {v1} from "uuid";
import {changeProfileStatus, getUserProfile, getUserStatus} from "../API/requestAPI";

export type arrayPostsTypes = Array<PostPropsType>;

export type profilePageType = {
    posts: arrayPostsTypes;
    newPostText: string;
    userProfileInfo: userProfileInfo | null;
    status: string;
};

export type userProfileInfo = {
    aboutMe: string | null;
    contacts: {vk: string},
    lookingForAJob: boolean | null;
    lookingForAJobDescription: string | null;
    fullName: string | null;
    userId: number;
    photos: {
        small: string;
        large: string;
    }
}

const ADD_POST = 'ADD_POST';
const CHANGE_TEXT = 'CHANGE_TEXT';
const SET_USER_INFO = 'SET_USER_INFO' as const;
const SET_USER_STATUS = 'SET_USER_STATUS' as const;
//AC
export const addPost = () => ({type: ADD_POST} as const);
export const updateNewPostText = (newText: string) => ({type: CHANGE_TEXT, newPostText: newText} as const);
export const setUserInfo = (profileInfo: userProfileInfo) => ({type:SET_USER_INFO, profileInfo});
export const setStatus = (status: string) => ({type:SET_USER_STATUS, status});


export const getInfoAndSetUserInfoThunkCreator = (userIdFromURL: string) =>  (dispatch: AppDispatch) => {
       getUserProfile(userIdFromURL)
       .then((response) => {
           dispatch(setUserInfo({...response.data}));
       });
}
export const getUserStatusThunk = (userId: number) => {
    return (dispatch: AppDispatch) => {
        getUserStatus(userId.toString())
            .then((res) => {
                dispatch(setStatus(res.data));
            })

    }
}
export const updateStatusThunk = (status: string) => {
    return (dispatch: AppDispatch) => {
        changeProfileStatus(status)
            .then(res => {
               if(res.data.resultCode === 0) {
                   dispatch(setStatus(status));
               }
            })

    }
}

let initialState:profilePageType =  {
    newPostText: '',
    posts: [
        {id: '1', text: 'hi there', likes: 5},
        {
            id: '2',
            text: 'hi there',
            likes: 5,
            avatar: 'https://banner2.cleanpng.com/20181231/fta/kisspng-computer-icons-user-profile-portable-network-graph-circle-svg-png-icon-free-download-5-4714-onli-5c2a3809d6e8e6.1821006915462707298803.jpg'
        },
        {
            id: '3',
            text: 'hi there',
            likes: 5,
            avatar: 'https://www.pngitem.com/pimgs/m/420-4204652_oic-provincial-statistics-officer-psa-maguindanao-user-icon.png'
        },
        {
            id: '4',
            text: 'hi there',
            likes: 5,
            avatar: 'https://banner2.cleanpng.com/20181231/fta/kisspng-computer-icons-user-profile-portable-network-graph-circle-svg-png-icon-free-download-5-4714-onli-5c2a3809d6e8e6.1821006915462707298803.jpg'
        },
    ],
    userProfileInfo: null,
    status: ''
}

export const profileReducer = (state: profilePageType = initialState, action: ActionsType):profilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostPropsType = {
                id: v1(),
                text: state.newPostText, // здесь мы юзаем newPostText из стейта
                likes: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case CHANGE_TEXT:
            // state.newPostText = action.newPostText;
            return {...state, newPostText: action.newPostText};
        case "SET_USER_INFO": {
            return {...state, userProfileInfo: action.profileInfo}
        }
        case "SET_USER_STATUS": {
            return {...state, status: action.status}
        }
        default:
            return state;
    }
}

