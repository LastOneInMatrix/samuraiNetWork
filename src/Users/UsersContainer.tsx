import React from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../State/redux-store";
import {followAC, getTotalCountAC, setUsersAC, setUsersPageAC, unFollowAC, usersType} from "../State/userReducer";
import {Users} from "./Users";


export type UsersPropsTypes = {
    forTest: string
}
export type MapStateToPropsType = {
    users: usersType;
    totalSize: number;
    pageSize: number;
    currentPage: number
}
export type UsersConnectedPropsType = MapStateToPropsType & MapDispatchToPropsType;
export  type MapDispatchToPropsType = {
    followHandler: (userId: number) => void;
    unFollowHandler: (userId: number) => void;
    setUsersHandler: (users: usersType) => void;
    getTotalCount: (totalSize: number) => void;
    setUsersPage: (page: number) => void;
} //todo как не путаться в импортах при склеивании конекченных типов?


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalSize: state.usersReducer.totalSize,
        currentPage: state.usersReducer.currentPage
    }
};


const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        followHandler: (userId: number) => dispatch(followAC(userId)),
        unFollowHandler: (userId: number) => dispatch(unFollowAC(userId)),
        setUsersHandler: (users: usersType) => dispatch(setUsersAC(users)),
        getTotalCount: (totalSize: number) => dispatch(getTotalCountAC(totalSize)),
        setUsersPage: (page: number) => dispatch(setUsersPageAC(page)),
    }
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(React.memo(Users))
