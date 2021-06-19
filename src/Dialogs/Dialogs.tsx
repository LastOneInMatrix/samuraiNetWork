import React, {ChangeEvent} from 'react';
import {DialogItem} from './Dialog/Dialog';
import {Message} from './Message/Message'
import styles from './Dialogs.module.css';
import {dialogPageType} from "../State/dialogReducer";


type DialogsPropsTypes = {
    page: number;
    isActive?: boolean;
    dialogPage: dialogPageType;
    onChangeTextHandler: (text: string) => void;
    addMessage: ()=>void;
}


export const Dialogs: React.FC<DialogsPropsTypes> = ({dialogPage, ...props}) => {
//BLL
    let {page = 1, isActive = false} = props;
    let state = dialogPage;

    const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeTextHandler(e.currentTarget.value)
    };
    const addMessage = () => {
        props.addMessage()
    };
//UI
    const dialogsDataJsx: Array<JSX.Element> = state.dialogsData.map((e) => {
        return e.id == 1 ? <DialogItem name={e.name} id={e.id} isActive={true}/> :
            <DialogItem name={e.name} id={e.id} isActive={isActive}/>
    });
    const messagesDataJsx: Array<JSX.Element> = state.messagesData.map((e) => {
        return <Message message={e.message} id={e.id}/>
    });

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsDataJsx}
            </div>
            <div className={styles.messages}>
                {messagesDataJsx}
            </div>
            <div>
                <textarea id={styles.messageArea} value={state.newMessageText} onChange={onChangeTextHandler}>haha</textarea>
                <button onClick={addMessage}>sent messages</button>
            </div>
        </div>
    )
}
