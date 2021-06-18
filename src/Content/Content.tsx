import React, {} from 'react';
import {Post} from '../Content/Posts/Post'
import style from './content.module.css';
import {ProfileInfoContainer} from "./ProfileInfo/ProfileInfoContainer";
import {AppStoreType} from "../State/redux-store";



type ContentPropsType = {
    store: AppStoreType;
}
export const Content = ({store, ...props}: ContentPropsType) => {

    const postsJSX: Array<JSX.Element> = store.getState().profilePage.posts.map(post => < Post id={post.id} text={post.text}  likes={post.likes} avatar={post.avatar}/>)
    return <div className={style.main}>
        <ProfileInfoContainer  store={store}  title={'My posts'} placeholder={'inter..'} img={'data:image/jpeg;base64,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'} />
        {postsJSX}
    </div>
}
