import React, {ChangeEvent} from 'react';
import style from './ProfileInfo.module.css'
import {ActionsType} from "../../State/MyReduxStore";
import {addPostActionCreator, changeTextActionCreator} from "../../State/profileReducer";



type ProfileInfoPropsType = {
    img: string,
    title: string,
    placeholder: string,
    newPostText: string,
    dispatch: (action: ActionsType) => void;
}
export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
    // const postMessageRef = React.createRef<HTMLTextAreaElement>();
    // const addPost = () => {
    //     if (postMessageRef.current) {
    //         addPostCallBack(postMessageRef.current?.value);
    //     }
    // }; //TODO версия с добавлением поста
    const {dispatch} = props;
    const addPost = () => {
        dispatch(addPostActionCreator());
    };

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changeTextActionCreator(e.currentTarget.value)); // todo почему не работает без newPostText (потому что прописан тип экшена конкретный)
    };
    return <div className={style.main}>
        <h3 className={style.title}>{props.title}</h3>
        <img src={props.img} alt={'textPicture'}/>
        {props.children}
        <textarea
            // ref={postMessageRef}
            className={style.textAreaPosts}
            placeholder={props.placeholder}
            value={props.newPostText}
            onChange={onPostChange}
        >
        </textarea><br/>
        <button onClick={addPost}>add post</button>
    </div>
}
