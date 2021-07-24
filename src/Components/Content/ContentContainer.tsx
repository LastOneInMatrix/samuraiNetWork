import React, {ComponentType} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {getInfoAndSetUserInfoThunkCreator, setUserInfo, userProfileInfo} from "../../State/profileReducer";
import {AppStateType} from "../../State/redux-store";
import {Content} from "./Content";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";





type MapStateToProps = {
    userProfileInfo: userProfileInfo | null;
    authorization: boolean
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
        userProfileInfo: state.profilePage.userProfileInfo,
        authorization: state.authReducer.authorization
    }
}

// const WithRouterContentContainer =  withRouter(ContentContainer);
// const WithRedirect =  WithAuthRedirect(WithRouterContentContainer);
//
// export const ConnectedContentContainer = connect<MapStateToProps,MapDispatchToProps,OwnPropsType,AppStateType>(mapStateToProps,
//     {
//         getInfoAndSetUserInfoThunkCreator,
//         setUserInfo
//     }
// )(WithRedirect)

export const ConnectedContentContainer = compose<ComponentType<OwnPropsType> >(
    connect<MapStateToProps,MapDispatchToProps,OwnPropsType,AppStateType>(mapStateToProps,
        {
            getInfoAndSetUserInfoThunkCreator,
            setUserInfo
        }
    ),
    withRouter,
    WithAuthRedirect
)(ContentContainer)