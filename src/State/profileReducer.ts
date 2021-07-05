import {ActionsType} from "./redux-store";
import {PostPropsType} from "../Content/Posts/Post";
import {v1} from "uuid";

export type arrayPostsTypes = Array<PostPropsType>;

export type profilePageType = {
    posts: arrayPostsTypes;
    newPostText: string;
    userProfileInfo: userProfileInfo | null;
};
export type userProfileInfo = {
    aboutMe: string | null;
    contacts: {vk: string},
    lookingForAJob: boolean | null;
    lookingForAJobDescription: string | null;
    fullName: string | null;
    userId: number;
    photos: {
        small: string | undefined;
        large: string | undefined;
    }
}

const ADD_POST = 'ADD_POST';
const CHANGE_TEXT = 'CHANGE_TEXT';
const SET_USER_INFO = 'SET_USER_INFO' as const;

//AC
export const addPost = () => ({type: ADD_POST} as const);
export const updateNewPostText = (newText: string) => (
    {
        type: CHANGE_TEXT, newPostText: newText
    } as const
);

export const setUserInfo = (profileInfo: userProfileInfo) => ({type:SET_USER_INFO, profileInfo});


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
    userProfileInfo: null
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
        default:
            return state;
    }
}