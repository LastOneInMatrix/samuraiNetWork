import React from 'react';
import axios from "axios";
import {UsersConnectedPropsType} from "./UsersContainer";
import styles from "./Users.module.css";

type MyState = {
    count: number; // like this
};


const axiosInstance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.0/', withCredentials: true});

export class Users extends React.Component<UsersConnectedPropsType, MyState> {
    constructor(props: UsersConnectedPropsType) {
        super(props);
    }


    componentDidMount() {
        axiosInstance.get(`users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsersHandler([...response.data.items]);
            this.props.getTotalCount(response.data.totalCount);
        }); // компонент был вмантирован в DOM
    }
    setUserPage(page: number) {
        this.props.setUsersPage(page);
        axiosInstance.get(`users?page=${page}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsersHandler(response.data.items);
        });
    }

    render()

    {
        const pagesCount = Math.ceil(this.props.totalSize/this.props.pageSize);
        let pages = [];
            for (let i =1; i<= pagesCount; i++) {
                pages.push(i);
            }

        return <div>
            <div style={{margin: '10px'}}>
                {pages.map((e,i) => <span key={i} style={{border: '1px solid black', margin: '2px'}} onClick={(event) => {this.setUserPage(e)}} className={this.props.currentPage === e ?  styles.selectedPage : ''}>...{e}</span>)}
            </div>
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