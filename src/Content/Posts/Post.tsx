import React from 'react';
import style from './Post.module.css'

export type PostPropsType = {
    id: string;
    text: string;
    likes: number;
    avatar?: string;
}
export const Post: React.FC<PostPropsType> = (props) => {
       let {avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFzt2pAbt6J9kCthHeMxsV2wliELkCAKqdU9d4fevixNlfV_cH9XFIc4BAqpp7SNIJafc&usqp=CAU' , text, likes}  = props;
    return (
        <div className={style.main}>
            <img src={avatar} alt='sorry' className={style.img}/>
            <p className={style.postman}>{text}<br/><b>{likes}{'\n'}likes</b></p>
        </div>
    )
}
