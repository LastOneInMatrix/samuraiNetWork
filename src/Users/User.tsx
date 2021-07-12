import React, {MouseEvent} from 'react';
import {NavLink} from "react-router-dom";
import styles from "./Users.module.css";
import {usersType, userType} from "../State/userReducer";
import {setFollowUnfollow} from "../API/requestAPI";


type UserOwnPropsType = {
    setUserPage: (page: number) => void;
    totalSize: number;
    pageSize: number;
    currentPage: number;
    users: usersType;
    followingInProgress: Array<number>;
    followHandler: (userId: number) => void;
    unFollowHandler: (userId: number) => void;
    setFollowing: (following: Array<number>) => void;
}


export const UserHelper = (props: UserOwnPropsType) => {
    const pagesCount = Math.ceil(props.totalSize / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    //todo почему без игнора TS не работает

    const followHandler = (user: userType, button: 'post' | 'delete') => (e: MouseEvent<HTMLButtonElement>) => {
        props.setFollowing([user.id]);
        setFollowUnfollow(user.id, button)
                .then(({data}) => {
                   // @ts-ignore
                    data.resultCode === 0 && button === 'post' ? props.followHandler(user.id) : props.unFollowHandler(user.id);
                    props.setFollowing([]);
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
                        <button disabled={props.followingInProgress.some((element) => user.id === element)} data-name={'delete'} onClick={followHandler(user, 'delete')}>UnFollow</button>
                        :
                        <button disabled={props.followingInProgress.some((element) => user.id === element)} data-name={'post'} onClick={followHandler(user, 'post')}>Follow</button>

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
