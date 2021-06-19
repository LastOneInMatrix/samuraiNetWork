import React from 'react';
import {addPostActionCreator, arrayPostsTypes, changeTextActionCreator} from "../../State/profileReducer";
import {ProfileInfo} from "./ProfileInfo";
import {connect} from "react-redux";
import {AppStateType} from "../../State/redux-store";
import {Dispatch} from "redux";


type ProfileInfoPropsType = {
    img: string;
    title: string;
    placeholder: string;
}
export type mapStateToPropsType = {
    posts: arrayPostsTypes,
    newPostText: string
};
export type mapDispatchToPropsType = {
    addPost: () => void;
    updateNewPostText: (text: string) => void
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator()); //todo how to add generic type for Dispatch
        },
        updateNewPostText: (text: string) => {
            let action = changeTextActionCreator(text);
            dispatch(action);
        },
    }
}
export const ProfileInfoContainer: React.FC<ProfileInfoPropsType> = connect(mapStateToProps, mapDispatchToProps)((props: any) =>  <ProfileInfo title={'as'} {...props} />);
