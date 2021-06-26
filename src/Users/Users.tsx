import React, {useEffect} from 'react';
import styles from './Users.module.css';
import {v1} from "uuid";
import {mapDispatchToPropsType, mapStateToPropsType} from "./UsersContainer";

export type UsersConnectedPropsType = mapStateToPropsType & mapDispatchToPropsType;


export const Users: React.FC<UsersConnectedPropsType> = ({users, ...props}) => {

    useEffect( ()=> {
        props.setUsersHandler([
            {
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcZZI0XWEhje7C8EavUlI8hAaJ2G6mXJhg1xedyWM0-f2-p9Pz9mkmN_1uKO4Stkotn4&usqp=CAU',
                follower: true,
                id: v1(),
                fullName: 'As',
                status: 'lalaland...',
                location: {
                    country: 'Russia',
                    city: 'Moscow'
                }                         // todo а как же при новых пришедших с сервака?
            } ,
            {
                img: 'https://goo.su/img/chrome.png',
                follower: false,
                id: v1(),
                fullName: 'Asa',
                status: 'My status.',
                location: {
                    country: 'Finland',
                    city: 'Helsinki'
                }
            }
            ])
    }, [] )

    return <div>
        {
            users.map(user => {
                return <div key={user.id}>
                    <h3>{user.fullName}</h3>
                    <img className={styles.messages} src={user.img} alt={'Just avatar'}/>
                    <em>{user.status}</em>
                    {user.follower ?
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
    </div>
}