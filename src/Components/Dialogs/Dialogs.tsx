import React, {ChangeEvent} from 'react';
import {DialogItem} from './Dialog/Dialog';
import {Message} from './Message/Message'
import styles from './Dialogs.module.css';
import {DialogsConnectedPropsType} from "./DialogsContainer";
import {InitialStateType} from "../../State/dialogReducer";
import {Redirect} from "react-router-dom";


type DialogsPropsTypes = {
    page: number;
    isActive?: boolean;
}


export const Dialogs: React.FC<DialogsPropsTypes & DialogsConnectedPropsType>  = ({dialogPage, ...props}) => {
//BLL
    let {page = 1, isActive = false} = props;
    let state: InitialStateType = dialogPage;

    const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeTextHandler(e.currentTarget.value)
    };
    const addMessage = () => {
        props.addMessage()
    };
    console.log(props)
//UI
    const dialogsDataJsx: Array<JSX.Element> = state.dialogsData.map((e, i) => {
        return e.id == 1 ? <DialogItem key={i} name={e.name} id={e.id} isActive={true}/> :
            <DialogItem key={i} name={e.name} id={e.id} isActive={isActive}/>
    });
    const messagesDataJsx: Array<JSX.Element> = state.messagesData.map((e) => {
        return <Message  key={e.id} message={e.message} id={e.id}/>
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
