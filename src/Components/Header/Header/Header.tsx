import React from 'react';
import style from './header.module.css';
import logo1 from './logo1.png'


type HeaderOwnPropsType = {
    login: string | null;
    id: number | null;
    authorization: boolean;
}

export const Header = ({id, login, authorization}: HeaderOwnPropsType) => {

    return <div className={style.main}>
        <img src={logo1} alt='no picture'/>
        <h3>LA.LA.Land - <b>{id}</b></h3>
        {authorization ?
            <h4 className={style.login}>{login} was connected</h4>
            :
            <h4 className={style.login}>Login</h4>
        }
    </div>
}