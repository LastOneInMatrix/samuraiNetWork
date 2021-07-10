import React from 'react';
import {connect} from "react-redux";
import axios from "axios";
import {AppStateType} from "../State/redux-store";
import {
    followHandler,
    getTotalCount,
    setFetching,
    setUsersHandler,
    setUsersPage,
    unFollowHandler,
    usersType, userType
} from "../State/userReducer";
import {UserHelper} from "./User";
import {Preloader} from "../Common/Preloader/Preloader";

export type UsersPropsTypes = {
    forTest: string
}
export type MapStateToPropsType = {
    users: usersType;
    totalSize: number;
    pageSize: number;
    currentPage: number;
    isFetching: boolean;
}
export type UsersConnectedPropsType = MapStateToPropsType & MapDispatchToPropsType & UsersPropsTypes;
export  type MapDispatchToPropsType = {
    followHandler: (userId: number) => void;
    unFollowHandler: (userId: number) => void;
    setUsersHandler: (users: usersType) => void;
    getTotalCount: (totalSize: number) => void;
    setUsersPage: (page: number) => void;
    setFetching: (isFetching: boolean) => void;
}
type MyState = {
    count: number; // like this
};


const axiosInstance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.0/', withCredentials: true});

class UsersContainer extends React.Component<UsersConnectedPropsType, MyState> {
    constructor(props: UsersConnectedPropsType) {
        super(props);
    }
    componentDidMount() {
        this.props.setFetching(true);
        axiosInstance.get<{items: Array<userType>, totalCount: number}>(`users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setFetching(false);
            this.props.setUsersHandler([...response.data.items]);
            this.props.getTotalCount(response.data.totalCount);
        }); // компонент был вмантирован в DOM
    }
    setUserPage(page: number)  {
        this.props.setFetching(true);
        this.props.setUsersPage(page);
        axiosInstance.get(`users?page=${page}&count=${this.props.pageSize}`).then(response => {
            this.props.setFetching(false);
            this.props.setUsersHandler(response.data.items);
        });
    }
    render() {
        return <>
            {
                this.props.isFetching ? <Preloader/> :  <UserHelper
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    totalSize={this.props.totalSize}
                    pageSize={this.props.pageSize}
                    followHandler={this.props.followHandler}
                    unFollowHandler={this.props.unFollowHandler}
                    setUserPage={this.setUserPage.bind(this)}   //bind-ить надо при передаче
                />
            }
        </>


    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalSize: state.usersReducer.totalSize,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching
    }
};

export const UsersConnectedContainer = connect(mapStateToProps,
    ({followHandler,
        unFollowHandler,
        setUsersHandler,
        getTotalCount,
        setUsersPage,
        setFetching
    })
)(UsersContainer) // в данном случае предпологается если в mapDispatchToProps передается не функция, а объект, то он автоматически будет создат функции и прокинет в них диспатч
//Todo после рефакторинга mapDispatchToProps, приложение стало работать намного быстрее