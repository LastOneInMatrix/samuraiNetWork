import {MessagePropsType} from "../Dialogs/Message/Message";
import {v1} from "uuid";
import {ActionsType} from "./MyReduxStore";
import {DialogItemPropsType} from "../Dialogs/Dialog/Dialog";


export type arrayMessages = Array<MessagePropsType>
export type arrayDialog = Array<DialogItemPropsType>

export type dialogPageType = {
    dialogsData: arrayDialog;
    messagesData: arrayMessages;
    newMessageText: string;
}

let initialState: dialogPageType = {
    dialogsData: [
        {id: 1, name: 'Me'},
        {id: 2, name: 'Gretta'},
        {id: 3, name: 'Lora Palmer'},
        {id: 4, name: 'Baby'},
        {id: 5, name: 'Lord'},
    ],
    messagesData: [
        {id: '1', message: 'HELLO'},
        {id: '2', message: `'What's news?'`},
        {id: '3', message: 'Nothing much'},
    ],
    newMessageText: '',
}
const CHANGE_MESSAGE_TEXT = 'CHANGE_MESSAGE_TEXT';
const ADD_MESSAGE = 'ADD_MESSAGE';

type AC = (text: string) => ({type: "CHANGE_MESSAGE_TEXT", text: string}) //Todo разобраться откуда это

export const changeMessageTextActionCreator = (text: string) => ({type: CHANGE_MESSAGE_TEXT, text} as const);
export const addMessagesActionCreator = (newMessageText: string) => {
    return {
        type: ADD_MESSAGE,
        text: newMessageText
    } as const;
}

export const dialogReducer = (state:dialogPageType = initialState, action:ActionsType):dialogPageType => {
    switch (action.type) {
        case CHANGE_MESSAGE_TEXT:
            state.newMessageText = action.text;
            return state;
        case ADD_MESSAGE:
            let newMessage: MessagePropsType = {
                id: v1(), message: '-' + action.text // a здесь мы юзаем text из actionCreator
            }
            state.messagesData.push(newMessage);
            state.newMessageText = '';
            return state;
        default:
            return state;
    }
}