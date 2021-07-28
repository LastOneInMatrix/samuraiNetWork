import React from 'react';
import style from './header.module.css';
import logo1 from './logo1.png'


type HeaderOwnPropsType = {
    login: string | null;
    id: number | null;
    authorization: boolean;
    logOutUserThunk: () => void;
}

export const Header = ({id, login, authorization, ...props}: HeaderOwnPropsType) => {

    return <div className={style.main}>
        <img src={logo1} alt='no picture'/>
        <h3>LA.LA.Land - <b>{id}</b></h3>
        {authorization ?
            <span className={style.login}>{login} was connected  <button onClick={props.logOutUserThunk}>Logout</button> </span>
            :
            <h4 className={style.login}>Login</h4>
        }
    </div>
}