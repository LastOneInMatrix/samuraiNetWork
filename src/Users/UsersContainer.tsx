import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../State/redux-store";
import {
    followHandler,
    followUnfollowThunkCreator,
    getUserThunkCreator,
    setFollowing,
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
    followingInProgress: Array<number>;
}
export type UsersConnectedPropsType = MapStateToPropsType & MapDispatchToPropsType & UsersPropsTypes;
export  type MapDispatchToPropsType = {
    followHandler: (userId: number) => void;
    unFollowHandler: (userId: number) => void;
    setUsersPage: (page: number) => void;
    setFollowing: (following: Array<number>) => void;
    getUser: (currentPage: number, pageSize: number) => void;
    followUnfollowThunkCreator: (user: userType, button: 'post' | 'delete') => void;
}
type MyState = {
    count: number; // like this
};


class UsersContainer extends React.Component<UsersConnectedPropsType, MyState> {
    constructor(props: UsersConnectedPropsType) {
        super(props);
    }

    componentDidMount() {
        this.props.getUser(this.props.currentPage, this.props.pageSize);
    }

    setUserPage(page: number) {
        this.props.setUsersPage(page);
        this.props.getUser(page, this.props.pageSize);
    }

    render() {
        console.log(this.props.isFetching);
        return <>
            {
                this.props.isFetching ? <Preloader/> : <UserHelper
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    totalSize={this.props.totalSize}
                    pageSize={this.props.pageSize}
                    followingInProgress={this.props.followingInProgress}
                    setUserPage={this.setUserPage.bind(this)}   //bind-ить надо при передаче
                    followUnfollow={this.props.followUnfollowThunkCreator}
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
        isFetching: state.usersReducer.isFetching,
        followingInProgress: state.usersReducer.followingInProgress
    }
};

export const UsersConnectedContainer: React.FC<UsersPropsTypes> = connect(mapStateToProps,
    ({
        followHandler,
        unFollowHandler,
        setUsersPage,
        setFollowing,  // (a,b) => dispatch(actionCreator(a,b));
        getUser: getUserThunkCreator,
        followUnfollowThunkCreator //(a,b) => (dispath) =>  dispatch(setFollowing(a,b)) - в случае с thunk
    })
)(UsersContainer) // в данном случае предпологается если в mapDispatchToProps передается не функция, а объект, то он автоматически будет создат функции и прокинет в них диспатч
//Todo после рефакторинга mapDispatchToProps, приложение стало работать намного быстрее