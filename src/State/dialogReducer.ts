import {MessagePropsType} from "../Dialogs/Message/Message";
import {v1} from "uuid";
import {ActionsType} from "./redux-store";

const CHANGE_MESSAGE_TEXT = 'CHANGE_MESSAGE_TEXT';
const ADD_MESSAGE = 'ADD_MESSAGE';

type DialogItemType = {
    id: number;
    name: string;
}
type MessageType = {
    id: string;
    message: string;
}
export type arrayMessages = Array<MessageType>
export type arrayDialog = Array<DialogItemType>

 const initialState = {
    dialogsData: [
        {id: 1, name: 'Me'},
        {id: 2, name: 'Gretta'},
        {id: 3, name: 'Lora Palmer'},
        {id: 4, name: 'Baby'},
        {id: 5, name: 'Lord'},
    ] as arrayDialog,
    messagesData: [
        {id: '1', message: 'HELLO'},
        {id: '2', message: `'What's news?'`},
        {id: '3', message: 'Nothing much'},
    ] as arrayMessages,
    newMessageText: '',
}

export type InitialStateType = typeof initialState;

export const changeMessageTextActionCreator = (text: string) => ({type: CHANGE_MESSAGE_TEXT, text} as const);
export const addMessagesActionCreator = () => ({type: ADD_MESSAGE} as const);


export const dialogReducer = (state:InitialStateType = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case CHANGE_MESSAGE_TEXT:
            return {...state, newMessageText: action.text};
        case ADD_MESSAGE:
            let newMessage: MessagePropsType = {
                id: v1(), message: '-' + state.newMessageText // a здесь мы юзаем text из actionCreator
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };
        default:
            return state;
    }
}