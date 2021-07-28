import React, {ComponentType} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {
    getInfoAndSetUserInfoThunkCreator, getUserStatusThunk,
    setUserInfo,
    updateStatusThunk,
    userProfileInfo
} from "../../State/profileReducer";
import {AppStateType} from "../../State/redux-store";
import {Content} from "./Content";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";





type MapStateToProps = {
    userProfileInfo: userProfileInfo | null;
    authorization: boolean
    myId: number | null;
    status: string;
};
type MapDispatchToProps = {
    setUserInfo: (profileInfo: userProfileInfo) => void;
    getInfoAndSetUserInfoThunkCreator: (userIdFromURL: string) => void;
    updateStatusThunk: (status: string) => void;
    getUserStatusThunk: (userId: number) => void;
}
type PathParamsType = {
    userId: string;
}
type PropsFromWithRouterType = RouteComponentProps<PathParamsType>;
type OwnPropsType = {
    defaultUserId:  number;
}


export type ConnectedPropsType = MapStateToProps & MapDispatchToProps & PropsFromWithRouterType & OwnPropsType;

// type ContentContainerPropsType = RouteComponentProps

type MyStateType = {};

class ContentContainer extends React.Component<ConnectedPropsType, MyStateType> {

    componentDidMount() {

        if (this.props.myId) {
            let userIdFromURL = this.props.match.params.userId || this.props.myId.toString();
            this.props.getUserStatusThunk(Number(userIdFromURL));
            this.props.getInfoAndSetUserInfoThunkCreator(userIdFromURL);
        }
    };

    render() {
        return (
            <Content {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        userProfileInfo: state.profilePage.userProfileInfo,
        authorization: state.authReducer.authorization,
        myId: state.authReducer.id,
        status: state.profilePage.status
    }
}


export const ConnectedContentContainer = compose<ComponentType<OwnPropsType> >(
    connect<MapStateToProps,MapDispatchToProps,OwnPropsType,AppStateType>(mapStateToProps,
        {
            getInfoAndSetUserInfoThunkCreator,
            setUserInfo,
            updateStatusThunk,
            getUserStatusThunk
        }
    ),
    withRouter,
    WithAuthRedirect
)(ContentContainer)