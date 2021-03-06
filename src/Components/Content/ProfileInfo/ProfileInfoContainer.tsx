import React from 'react';
import {connect} from "react-redux";
import {
    addPost,
    updateNewPostText,
    arrayPostsTypes, userProfileInfo,
} from "../../../State/profileReducer";
import {ProfileInfo} from "./ProfileInfo";
import {AppStateType} from "../../../State/redux-store";



type ProfileInfoPropsType = {
    img: string;
    title: string;
    placeholder: string;
    userInfo: userProfileInfo | null;
    userId: string;
    status: string;
    updateStatusThunk: (status: string) => void;
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

export const ProfileInfoContainer: React.FC<ProfileInfoPropsType> = connect(mapStateToProps, {addPost, updateNewPostText})((props: any) =>  <ProfileInfo  {...props} />);
