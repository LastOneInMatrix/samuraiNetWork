import React from 'react';
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {
    addMessagesActionCreator,
    changeMessageTextActionCreator,
    InitialStateType
} from '../../State/dialogReducer'
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../State/redux-store";
import {MstpType, WithAuthRedirect} from "../hoc/WithAuthRedirect";


type DialogsPropsTypes = {
    page: number;
    isActive?: boolean;
};

//свойства прописанный в mapStateToPropsTypes и mapDispatchToPropsTypes становятся приконекченными пропсами оборачеваемой компоненты Dialogs
type mapStateToPropsTypes = {
    dialogPage: InitialStateType;
};

type mapDispatchToPropsTypes = {
    onChangeTextHandler: (text: string) => void;
    addMessage: () => void;
};

export type DialogsConnectedPropsType = mapStateToPropsTypes & mapDispatchToPropsTypes;


const mapStateToProps = (state: AppStateType): mapStateToPropsTypes => {
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

// export const  DialogsContainer: React.FC<DialogsPropsTypes> = WithAuthRedirect(connect(mapStateToProps, mapStateToDispatch)(Dialogs))
export const  DialogsContainer = compose<React.ComponentType<DialogsPropsTypes>>(
    connect(mapStateToProps, mapStateToDispatch),
    WithAuthRedirect
)(Dialogs)