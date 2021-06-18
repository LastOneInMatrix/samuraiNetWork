import React from 'react';

import {addMessagesActionCreator, changeMessageTextActionCreator} from '../State/dialogReducer'
import {Dialogs} from "./Dialogs";
import {AppStoreType} from "../State/redux-store";

type DialogsPropsTypes = {
    page: number;
    isActive?: boolean;
    store:AppStoreType;
};


export const DialogsContainer: React.FC<DialogsPropsTypes> = ({store, ...props}) => {
//BLL
    const dialogPage = store.getState().dialogPage;

    const onChangeTextHandler = (text: string) => {
        store.dispatch(changeMessageTextActionCreator(text));
    };
    const addMessage = () => {
        store.dispatch(addMessagesActionCreator(dialogPage.newMessageText));
    };
    return <Dialogs onChangeTextHandler={onChangeTextHandler} dialogPage={dialogPage} addMessage={addMessage} page={props.page} />

}
