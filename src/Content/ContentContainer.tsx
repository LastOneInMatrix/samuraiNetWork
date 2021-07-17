import React, {} from 'react';
import {RouteComponentProps, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {getInfoAndSetUserInfoThunkCreator, setUserInfo, userProfileInfo} from "../State/profileReducer";
import {AppStateType} from "../State/redux-store";
import {Content} from "./Content";




type MapStateToProps = {
    userProfileInfo: userProfileInfo | null;
};
type MapDispatchToProps = {
    setUserInfo: (profileInfo: userProfileInfo) => void;
    getInfoAndSetUserInfoThunkCreator: (userIdFromURL: string) => void;
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
        const userIdFromURL = this.props.match.params.userId;
        this.props.getInfoAndSetUserInfoThunkCreator(userIdFromURL);
    };

    render() {
        return (
            <Content {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        userProfileInfo: state.profilePage.userProfileInfo
    }
}

const WithRouterContentContainer = withRouter(ContentContainer);

export const ConnectedContentContainer = connect<MapStateToProps,MapDispatchToProps,OwnPropsType,AppStateType>(mapStateToProps,
    {
        getInfoAndSetUserInfoThunkCreator,
        setUserInfo
    }
)(WithRouterContentContainer)