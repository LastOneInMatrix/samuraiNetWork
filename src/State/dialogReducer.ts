import {MessagePropsType} from "../Dialogs/Message/Message";
import {v1} from "uuid";
import {ActionsType, dialogPageType} from "./redux";

const CHANGE_MESSAGE_TEXT = 'CHANGE_MESSAGE_TEXT';
const ADD_MESSAGE = 'ADD_MESSAGE';

type AC = (text: string) => ({type: "CHANGE_MESSAGE_TEXT", text: string})

export const changeMessageTextActionCreator = (text: string) => ({type: CHANGE_MESSAGE_TEXT, text} as const);
export const addMessagesActionCreator = (newMessageText: string) => {
    return {
        type: ADD_MESSAGE,
        text: newMessageText
    } as const;
}

export const dialogReducer = (state:dialogPageType, action:ActionsType):dialogPageType => {
    if (action.type === CHANGE_MESSAGE_TEXT) {
        state.newMessageText = action.text;
        return state;
    } else if (action.type === ADD_MESSAGE) {
        let newMessage: MessagePropsType = {
            id: v1(), message: '-' + action.text // a здесь мы юзаем text из actionCreator
        }
        state.messagesData.push(newMessage);
        state.newMessageText = '';
        return state;
    }

    else return state;
}