import React from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../State/redux-store";
import {followAC, setUsersAC, unFollowAC, usersType} from "../State/userReducer";
import {Users} from "./Users";



export type UsersPropsTypes = {
    forTest: string
}
export type MapStateToPropsType = {
    users: usersType
}
export type UsersConnectedPropsType = MapStateToPropsType & MapDispatchToPropsType;
export  type MapDispatchToPropsType = {
    followHandler: (userId: number) => void;
    unFollowHandler: (userId: number) => void;
    setUsersHandler: (users: usersType) => void;
} //todo как не путаться в импортах при склеивании конекченных типов?


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({users: state.usersReducer.users});


const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        followHandler: (userId: number) => dispatch(followAC(userId)),
        unFollowHandler: (userId: number) => dispatch(unFollowAC(userId)),
        setUsersHandler: (users: usersType) => dispatch(setUsersAC(users)),
    }
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(React.memo(Users))
