import {MessagePropsType} from "../Dialogs/Message/Message";
import {v1} from "uuid";
import {ActionsType} from "./redux-store";
import {DialogItemPropsType} from "../Dialogs/Dialog/Dialog";

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

// type AC = (text: string) => ({type: "CHANGE_MESSAGE_TEXT", text: string}) //Todo разобраться откуда это
// type changeMessageTextActionCreatorType = ReturnType<typeof changeMessageTextActionCreator>  //эта запись автоматом генерит возвращаемый тайп функции, поэтому дописывать какой тип возвращает функция не требуется

export const changeMessageTextActionCreator = (text: string) => ({type: CHANGE_MESSAGE_TEXT, text} as const);

export const addMessagesActionCreator = () => {
    return {
        type: ADD_MESSAGE,
    } as const;
}

export const dialogReducer = (state:dialogPageType = initialState, action:ActionsType):dialogPageType => {
    switch (action.type) {
        case CHANGE_MESSAGE_TEXT:
            return {...state, newMessageText: action.text};
        case ADD_MESSAGE:
            let newMessage: MessagePropsType = {
                id: v1(), message: '-' + state.newMessageText // a здесь мы юзаем text из actionCreator
            }
            let a =  {
                ...state,
            }
            a.messagesData.push(newMessage) //todo как это работает?  мы не делаем так дабы ссылки на объекты не накапливались, и тем самым сокращаем затраченную память
            return a;
        default:
            return state;
    }
}