import React from 'react';

import {addMessagesActionCreator, changeMessageTextActionCreator} from '../State/dialogReducer'
import {Dialogs} from "./Dialogs";
import StoreContext from '../StoreContext';

type DialogsPropsTypes = {
    page: number;
    isActive?: boolean;
};


export const DialogsContainer: React.FC<DialogsPropsTypes> = ({...props}) => {

    return <StoreContext.Consumer >
        {(store) => {
            const dialogPage = store.getState().dialogPage;

            const onChangeTextHandler = (text: string) => {
                store.dispatch(changeMessageTextActionCreator(text));
            };
            const addMessage = () => {
                store.dispatch(addMessagesActionCreator(dialogPage.newMessageText));
            };
           return <Dialogs onChangeTextHandler={onChangeTextHandler} dialogPage={dialogPage} addMessage={addMessage} page={props.page} />
        }}
    </StoreContext.Consumer>



}
