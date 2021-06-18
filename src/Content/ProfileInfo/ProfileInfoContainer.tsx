import React from 'react';
import {addPostActionCreator, changeTextActionCreator} from "../../State/profileReducer";
import {ProfileInfo} from "./ProfileInfo";
import {connect} from "react-redux";
import {AppStateType} from "../../State/redux-store";


type ProfileInfoPropsType = {
    img: string;
    title: string;
    placeholder: string;
}

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updateNewPostText: (text: string) => {
            let action = changeTextActionCreator(text);
            dispatch(action);
        }
    }
}
export const ProfileInfoContainer: React.FC<ProfileInfoPropsType> = connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
