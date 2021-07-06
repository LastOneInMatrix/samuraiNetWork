import React, {} from 'react';
import axios from "axios";
import {RouteComponentProps, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {setUserInfo, userProfileInfo} from "../State/profileReducer";
import {AppStateType} from "../State/redux-store";
import {Content} from "./Content";



type MapStateToProps = {
    userProfileInfo: userProfileInfo | null;
};
type MapDispatchToProps = {
    setUserInfo: (profileInfo: userProfileInfo) => void;
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
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + (userIdFromURL ?  userIdFromURL : 2)).then((response) => {
            this.props.setUserInfo({...response.data});
        })
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
        setUserInfo
    }
)(WithRouterContentContainer)