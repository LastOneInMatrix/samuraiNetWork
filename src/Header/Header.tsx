import React from 'react';
import style from './header.module.css';
import logo1 from './logo1.png'
export const Header = () => {
    return <div className={style.main}>
              <img src={logo1} alt='no picture'/>
              <h3>LA.LA.Land</h3>
            </div>
}