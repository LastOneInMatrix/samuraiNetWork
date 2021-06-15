import {ActionsType, profilePageType} from "./redux";
import {PostPropsType} from "../Content/Posts/Post";
import {v1} from "uuid";


const ADD_POST = 'ADD_POST';
const CHANGE_TEXT = 'CHANGE_TEXT';

export const addPostActionCreator = () => ({type: ADD_POST} as const);
export const changeTextActionCreator = (newText: string) => (
    {
        type: CHANGE_TEXT, newPostText: newText
    } as const //todo узнать про as const
);

export const profileReducer = (state: profilePageType, action: ActionsType):profilePageType => {
    if (action.type === ADD_POST) {
        const newPost: PostPropsType = {
            id: v1(),
            text: state.newPostText, // здесь мы юзаем newPostText из стейта
            likes: 0,
        }
        state.posts.push(newPost);
        state.newPostText = '';
        return state;

    } else if (action.type === CHANGE_TEXT) {
        state.newPostText = action.newPostText;
        return state;
    }
    else {
            return state;
    }
}