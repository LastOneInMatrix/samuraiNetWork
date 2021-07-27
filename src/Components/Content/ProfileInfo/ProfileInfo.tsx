import React, {ChangeEvent} from 'react';
import style from './ProfileInfo.module.css';
import {Post} from "../Posts/Post";
import {mapDispatchToPropsType, mapStateToPropsType} from "./ProfileInfoContainer";
import {userProfileInfo} from "../../../State/profileReducer";
import {StatusCom} from "../Status/StatusCom";



export type ProfileInfoPropsType = {
    img: string;
    status: string;
    placeholder: string;
    userInfo: userProfileInfo | null;
    userId: string;
    updateStatusThunk: (status: string) => void;
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

        <StatusCom userID={props.userId} status={props.status} updateStatusThunk={props.updateStatusThunk}/>

        <div className={style.info}>
            <div className={style.infoMiniContainer}>
                <b style={{fontSize: '20px'}}>{props.userInfo?.fullName}</b>
                < img src={props.userInfo?.photos?.small ? props.userInfo?.photos?.small : 'https://e7.pngegg.com/pngimages/709/358/png-clipart-price-toyservice-soil-business-no-till-farming-no-rectangle-pie.png'} alt={'textPicture'}/>
                <div><b>Обо мне: </b> <p>{props.userInfo?.aboutMe}</p></div>
            </div>
            <div className={style.infoMiniContainer}>
                <b>Контакты: </b>
                <div> <p>{props.userInfo?.contacts.vk}</p></div>
                <b>В поисках работы: </b>
                <div> <p>{props.userInfo?.lookingForAJob ? 'Да' : 'Нет'}</p></div>
            </div>
            <div className={style.infoMiniContainer}>
                <a href={void(0)}>Написать</a>
            </div>
        </div>

        {props.children}
        <br/>
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
