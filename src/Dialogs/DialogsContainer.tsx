import React from 'react';
import {connect} from "react-redux";
import {addMessagesActionCreator, changeMessageTextActionCreator} from '../State/dialogReducer'
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../State/redux-store";

type DialogsPropsTypes = {
    page: number;
    isActive?: boolean;
};

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogPage: state.dialogPage,
    }
}
const mapStateToDispatch = (dispatch: any) => {
    return {
        onChangeTextHandler: (text: string) => {dispatch(changeMessageTextActionCreator(text))},
        addMessage: () => {dispatch(addMessagesActionCreator())}
    }
}
export const  DialogsContainer: React.FC<DialogsPropsTypes> = connect(mapStateToProps, mapStateToDispatch)(Dialogs)
