import React from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import axios from "axios";
import {AppStateType} from "../State/redux-store";
import {
    followAC,
    getTotalCountAC,
    setFetchingAC,
    setUsersAC,
    setUsersPageAC,
    unFollowAC,
    usersType
} from "../State/userReducer";
import {UserHelper} from "./User";
import logo from '../assets/loader.svg'
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
} //todo как не путаться в импортах при склеивании конекченных типов?
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
        axiosInstance.get(`users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setFetching(false);
            this.props.setUsersHandler([...response.data.items]);
            this.props.getTotalCount(response.data.totalCount);
        }); // компонент был вмантирован в DOM
    }
    setUserPage = (page: number)  => {
        this.props.setFetching(true);
        this.props.setUsersPage(page);
        axiosInstance.get(`users?page=${page}&count=${this.props.pageSize}`).then(response => {
            this.props.setFetching(false);
            this.props.setUsersHandler(response.data.items);
        });
    }
    render() {
        console.log(this.props.isFetching);
        return <>
            {
                this.props.isFetching ? <Preloader/> :  <UserHelper
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    totalSize={this.props.totalSize}
                    pageSize={this.props.pageSize}
                    followHandler={this.props.followHandler}
                    unFollowHandler={this.props.unFollowHandler}
                    setUserPage={this.setUserPage}
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


const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        followHandler: (userId: number) => dispatch(followAC(userId)),
        unFollowHandler: (userId: number) => dispatch(unFollowAC(userId)),
        setUsersHandler: (users: usersType) => dispatch(setUsersAC(users)),
        getTotalCount: (totalSize: number) => dispatch(getTotalCountAC(totalSize)),
        setUsersPage: (page: number) => dispatch(setUsersPageAC(page)),
        setFetching: (isFetching: boolean) => dispatch(setFetchingAC(isFetching))
    }
};

export const UsersConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
