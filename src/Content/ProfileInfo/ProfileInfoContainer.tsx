import React from 'react';
import {addPostActionCreator, changeTextActionCreator} from "../../State/profileReducer";
import {ProfileInfo} from "./ProfileInfo";
import {AppStoreType} from "../../State/redux-store";




type ProfileInfoPropsType = {
    store: AppStoreType;
    img: string;
    title: string;
    placeholder: string;
}
export const ProfileInfoContainer: React.FC<ProfileInfoPropsType> = (props) => {
    const {store} = props;
    const newPostText = store.getState().profilePage.newPostText;
    const addPost = () => {
        store.dispatch(addPostActionCreator());
    };

    const onPostChange = (text: string) => {
       let action = changeTextActionCreator(text);
        store.dispatch(action);
    };
    return <div >
       <ProfileInfo updateNewPostText={onPostChange} addPost={addPost} img={props.img} title={props.title} placeholder={props.placeholder} newPostText={newPostText}/>
    </div>
}
