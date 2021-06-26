import React, {useEffect} from 'react';
import styles from './Users.module.css';
import {mapDispatchToPropsType, mapStateToPropsType} from "./UsersContainer";
import axios from "axios";

export type UsersConnectedPropsType = mapStateToPropsType & mapDispatchToPropsType;


export const Users: React.FC<UsersConnectedPropsType> = ({users, ...props}) => {

    useEffect( ()=> {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsersHandler([
                ...response.data.items
            ])
        })

    }, [] )

    return <div>
        {
            users.map(user => {
                return <div key={user.id}>
                    <h3>{user.name}</h3>
                    <img className={styles.messages} src={user.photos.small === undefined && user.photos.small === null? user.photos.small : 'https://www.w3schools.com/w3css/img_avatar3.png'} alt={'Just avatar'}/>
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
    </div>
}