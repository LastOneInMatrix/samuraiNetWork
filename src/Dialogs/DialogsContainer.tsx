import React from 'react';
import {connect} from "react-redux";
import {addMessagesActionCreator, changeMessageTextActionCreator, dialogPageType} from '../State/dialogReducer'
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../State/redux-store";
import {Dispatch} from "redux";

type DialogsPropsTypes = {
    page: number;
    isActive?: boolean;
};

type mapStateToPropsTypes = {
    dialogPage: dialogPageType;
};

type mapDispatchToPropsTypes = {
    onChangeTextHandler: (text: string) => void;
    addMessage: () => void;
};
//todo узнать как типизировать dispatch

const mapStateToProps = (state: AppStateType):mapStateToPropsTypes => {
    return {
        dialogPage: state.dialogPage,
    }
};

const mapStateToDispatch = (dispatch: Dispatch): mapDispatchToPropsTypes => {    //обязательно импортить Dispatch type из редакса он проверяет на то что диспатчитться экшен в виде объекта с обязательным свойством type? можно так же дополнительно типизировать поспредством дженерика, указывая конретный тип экшена
    return {
        onChangeTextHandler: (text: string) => {dispatch(changeMessageTextActionCreator(text))},
        addMessage: () => {dispatch(addMessagesActionCreator())},
    }
};
export const  DialogsContainer: React.FC<DialogsPropsTypes> = connect(mapStateToProps, mapStateToDispatch)(Dialogs) // todo how to add props
