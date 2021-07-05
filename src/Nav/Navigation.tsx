import React from 'react';
import {NavLink} from "react-router-dom";

import style from './navigation.module.css';


export const Navigation = () => {
    return <div className={style.main}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
         <ul>
             <li><NavLink to="/Profile" activeClassName={style.active} >Profile</NavLink></li>
             <li><NavLink to="/Dialogs" activeClassName={style.active}  >Dialogs</NavLink></li>
             <li><NavLink to="/users" activeClassName={style.active}  >Users</NavLink></li>
             <li><NavLink to="/Music" activeClassName={style.active} >Music</NavLink></li>
             <li><NavLink to="/Settings" activeClassName={style.active} >Settings</NavLink></li>
         </ul>

            </div>
}