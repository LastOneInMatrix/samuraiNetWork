import React from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../State/redux-store";
import {followAC, setUsersAC, unFollowAC, usersType} from "../State/userReducer";
import {Users, UsersConnectedPropsType} from "./Users";
import {Dialogs} from "../Dialogs/Dialogs";



export type UsersPropsTypes =  {
  forTest: string
}
export type mapStateToPropsType = {
    users:usersType
}

export  type mapDispatchToPropsType = {
    followHandler: (userId: string) => void;
    unFollowHandler: (userId: string) => void;
    setUsersHandler: (users: usersType) => void;
} //todo как не путаться в импортах при склеивании конекченных типов?


const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({users: state.usersReducer.users});


const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        followHandler: (userId: string) => dispatch(followAC(userId)),
        unFollowHandler: (userId: string) => dispatch(unFollowAC(userId)),
        setUsersHandler: (users: usersType) => dispatch(setUsersAC(users)),
    }
};

export const  UsersContainer: React.FC<{}> = connect(mapStateToProps, mapDispatchToProps)(Users)
