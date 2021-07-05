import React, {} from 'react';
import {Content} from "./Content";
import axios from "axios";
import {setUserInfo, userProfileInfo} from "../State/profileReducer";
import {connect} from "react-redux";
import {AppStateType} from "../State/redux-store";


type MapStateToProps = {
    userProfileInfo: userProfileInfo | null;
};
type MapDispatchToProps = {
    setUserInfo: (profileInfo: userProfileInfo) => void;
}

export type ConnectedPropsType = MapStateToProps & MapDispatchToProps;
type MyStateType = {};

class ContentContainer extends React.Component<ConnectedPropsType, MyStateType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/2').then((response) => {
            this.props.setUserInfo({...response.data});
            console.log()
        })
    };

    render() {
        return (
            <Content {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        userProfileInfo: state.profilePage.userProfileInfo
    }
}

export const ConnectedContentContainer = connect(mapStateToProps,
    {
        setUserInfo
    }
)(ContentContainer)