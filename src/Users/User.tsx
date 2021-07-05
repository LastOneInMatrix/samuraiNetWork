import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./Users.module.css";
import {usersType} from "../State/userReducer";

type UserOwnPropsType = {
    setUserPage: (page: number) => void;
    totalSize: number;
    pageSize: number;
    currentPage: number;
    users: usersType;
    followHandler: (userId: number) => void;
    unFollowHandler: (userId: number) => void;
}

export const UserHelper = (props: UserOwnPropsType) => {

    const pagesCount = Math.ceil(props.totalSize / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <>
        <div style={{margin: '10px'}}>
            {pages.map((e, i) => <span
                key={i} style={{border: '1px solid black', margin: '2px'}}
                onClick={(event) => {
                    console.log(props.setUserPage)
                    props.setUserPage(e) //todo как зайбайндить, иначе теряется контекст
                }}
                className={props.currentPage === e ? styles.selectedPage : ''}>{e}
            </span>
            )}
        </div>
        {
            props.users.map(user => {
                return <div key={user.id}>
                    <h3>{user.name}</h3>
                    <NavLink to={'/Profile'}>
                        <img className={styles.messages}
                             src={user.photos.small ? user.photos.small : 'https://www.w3schools.com/w3css/img_avatar3.png'}
                             alt={'Just avatar'}/>
                    </NavLink>
                    <em>{user.status}</em>
                    {user.followed ?
                        <button onClick={() => {
                            props.unFollowHandler(user.id)
                        }}>Follow</button>
                        :
                        <button onClick={() => {
                           props.followHandler(user.id)
                        }}>UnFollow</button>
                    }
                    <hr
                        style={{
                            color: 'red',
                            backgroundColor: 'red',
                            height: 5
                        }}
                    />
                </div>
            })
        }
    </>
};
