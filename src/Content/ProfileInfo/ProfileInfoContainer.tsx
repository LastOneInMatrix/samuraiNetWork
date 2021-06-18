import React from 'react';
import {addPostActionCreator, changeTextActionCreator} from "../../State/profileReducer";
import {ProfileInfo} from "./ProfileInfo";
import StoreContext from '../../StoreContext';
import {Post} from "../Posts/Post";




type ProfileInfoPropsType = {
    img: string;
    title: string;
    placeholder: string;
}
export const ProfileInfoContainer: React.FC<ProfileInfoPropsType> = (props) => {
    return (
        <StoreContext.Consumer >
            { (store) => {

                const newPostText = store.getState().profilePage.newPostText;
                const addPost = () => {
                    store.dispatch(addPostActionCreator());
                };

                const onPostChange = (text: string) => {
                    let action = changeTextActionCreator(text);
                    store.dispatch(action);
                };
                const postsJSX: Array<JSX.Element> = store.getState().profilePage.posts.map(post => < Post id={post.id} text={post.text}  likes={post.likes} avatar={post.avatar}/>)
               return (
                   <div>
                       <ProfileInfo updateNewPostText={onPostChange} addPost={addPost} newPostText={newPostText} img={props.img} title={props.title} placeholder={props.placeholder} />
                       {postsJSX}
                  </div>
               )
            }}
        </StoreContext.Consumer>
        )
}
