import React, {ChangeEvent} from 'react';
import style from './ProfileInfo.module.css'



type ProfileInfoPropsType = {
    img: string,
    title: string,
    placeholder: string,
    newPostText: string,
    updateNewPostText: (text: string) => void;
    addPost: () => void
}
export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    const onAddPost = () => {
        props.addPost();
    };

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
         props.updateNewPostText(e.currentTarget.value);
    };

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
    </div>
}
