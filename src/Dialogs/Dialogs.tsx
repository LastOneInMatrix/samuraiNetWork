import React, {ChangeEvent} from 'react';
import {DialogItem} from './Dialog/Dialog';
import {Message} from './Message/Message'
import styles from './Dialogs.module.css';
import {
    ActionsType,
    arrayDialog,
    arrayMessages,
} from "../State/MyReduxStore";
import {addMessagesActionCreator, changeMessageTextActionCreator} from '../State/dialogReducer'

type DialogsPropsTypes = {
    page: number;
    isActive?: boolean;
    messages: arrayMessages;
    newMessageText: string;
    dialogs:arrayDialog;
    dispatch: (action: ActionsType) => void;
}


export const Dialogs: React.FC<DialogsPropsTypes> = ({dispatch, ...props}) => {
//BLL
    let {page = 1, isActive = false} = props;


//UI
    const dialogsDataJsx: Array<JSX.Element> = props.dialogs.map((e) => {
        return e.id == 1 ? <DialogItem name={e.name} id={e.id} isActive={true}/> :
            <DialogItem name={e.name} id={e.id} isActive={isActive}/>
    });
    const messagesDataJsx: Array<JSX.Element> = props.messages.map((e) => {
        return <Message message={e.message} id={e.id}/>
    });

    const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changeMessageTextActionCreator(e.currentTarget.value));
    }
    const addMessage = () => {
        dispatch(addMessagesActionCreator(props.newMessageText));
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsDataJsx}
            </div>
            <div className={styles.messages}>
                {messagesDataJsx}
            </div>
            <div>
                <textarea id={styles.messageArea} value={props.newMessageText} onChange={onChangeTextHandler}></textarea>
                <button onClick={addMessage}>sent messages</button>
            </div>
        </div>
    )
}
