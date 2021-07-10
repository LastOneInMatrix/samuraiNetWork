import React, {MouseEvent} from 'react';
import {NavLink} from "react-router-dom";
import styles from "./Users.module.css";
import {usersType, userType} from "../State/userReducer";
import axios from "axios";

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

    const axiosInstance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.0/', withCredentials: true, headers: {'API-KEY': 'a8a869e7-f94e-4a9a-a53f-4ef40e96d952'}});

    const followHandler = (user: userType, button: 'post' | 'delete') => (e: MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.dataset.name);
        axiosInstance[button](`follow/${user.id}`)
                .then((response) => {
                   response.data.resultCode === 0 && button === 'post' ? props.followHandler(user.id) : props.unFollowHandler(user.id);
                })
    } //todo как перенести функцию handler сюда - каррирование - вызвав первую функцию - он вернет вторую функцию которая уже с параметром евент и подходит под условия

    return <>
        <div style={{margin: '10px'}}>
            {pages.map((e, i) => {
                    return <span
                        key={i} style={{border: '1px solid black', margin: '2px'}}
                        onClick={() => {
                            props.setUserPage(e)
                        }}
                        className={props.currentPage === e ? styles.selectedPage : ''}>{e}
                    </span>
                }
            )}
        </div>
        {
            props.users.map(user => {
                return <div key={user.id}>
                    <h3>{user.name}</h3>
                    <NavLink to={'/Profile/' + user.id}>

                        <img
                            className={styles.messages}
                            src={user.photos.small ? user.photos.small : 'https://www.w3schools.com/w3css/img_avatar3.png'}
                            alt={'Just avatar'}
                        />
                    </NavLink>
                    <em>{user.status}</em>
                    {user.followed ?
                        <button data-name={'delete'} onClick={followHandler(user, 'delete')}>UnFollow</button>
                        :
                        <button data-name={'post'} onClick={followHandler(user, 'post')}>Follow</button>

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
