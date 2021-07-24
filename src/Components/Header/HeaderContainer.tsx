import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../State/redux-store";
import {getUserLoginDataThunkCreator} from "../../State/authReducer/actions";
import {Header} from "./Header/Header";


export type MapStateToPropsType = {
    login: string | null;
    id: number | null;
    authorization: boolean;
}
export type MapDispatchToPropsType = {
    getUserLoginDataThunkCreator: () => void;
}
export type HeaderContainerConnectedProps = MapStateToPropsType & MapDispatchToPropsType;
type MyState = {
    count: number; // like this
};

class HeaderContainer extends React.Component<HeaderContainerConnectedProps, MyState> {
    componentDidMount() {
        this.props.getUserLoginDataThunkCreator();
    }
    render() {
        return <>
            <Header {...this.props}/>
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        login: state.authReducer.login,
        id: state.authReducer.id,
        authorization: state.authReducer.authorization,
    }
}

export const HeaderConnectedComponent =
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
        {
            getUserLoginDataThunkCreator
        }
    )(HeaderContainer);
