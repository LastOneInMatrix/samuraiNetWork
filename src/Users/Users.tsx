import React from 'react';
import axios from "axios";
import {UsersConnectedPropsType} from "./UsersContainer";
import styles from "./Users.module.css";

type MyState = {
    count: number; // like this
};

export class Users extends React.Component<UsersConnectedPropsType, MyState> {
    constructor(props: UsersConnectedPropsType) {
        super(props);
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsersHandler([...response.data.items]);
        });
        alert('as')
    }
    render(){
        return <div>
            {
                this.props.users.map(user => {
                    return <div key={user.id}>
                        <h3>{user.name}</h3>
                        <img className={styles.messages} src={user.photos.small? user.photos.small : 'https://www.w3schools.com/w3css/img_avatar3.png'} alt={'Just avatar'}/>
                        <em>{user.status}</em>
                        {user.followed ?
                            <button onClick={() => {
                                this.props.unFollowHandler(user.id)
                            }}>Follow</button>
                            :
                            <button onClick={() => {
                                this.props.followHandler(user.id)
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
}