import React, {ChangeEvent} from 'react';
import style from './ProfileInfo.module.css';
import {Post} from "../Posts/Post";
import {mapDispatchToPropsType, mapStateToPropsType} from "./ProfileInfoContainer";



type ProfileInfoPropsType = {
    img: string;
    title: string;
    placeholder: string;
}  & mapStateToPropsType & mapDispatchToPropsType;

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    const onAddPost = () => {
        props.addPost();
    };

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
         props.updateNewPostText(e.currentTarget.value);
    };
    const postsJSX: Array<JSX.Element> = props.posts.map(post => < Post key={post.id} id={post.id} text={post.text}  likes={post.likes} avatar={post.avatar}/>)
    return <div className={style.main}>
        <h3 className={style.title}>{props.title}</h3>
        <img src={props.img} alt={'textPicture'}/>
        {props.children}
        <textarea
            className={style.textAreaPosts}
            placeholder={props.placeholder}
            value={props.newPostText}
            onChange={onPostChange}
        >
        </textarea> <br/>
        <button onClick={onAddPost}>add post</button>
        {postsJSX}
    </div>
}
