import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../State/redux-store";
import {
    followHandler,
    getTotalCount,
    setFetching, setFollowing,
    setUsersHandler,
    setUsersPage,
    unFollowHandler,
    usersType
} from "../State/userReducer";
import {UserHelper} from "./User";
import {Preloader} from "../Common/Preloader/Preloader";
import {getUser} from "../API/requestAPI";

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
    setUsersHandler: (users: usersType) => void;
    getTotalCount: (totalSize: number) => void;
    setUsersPage: (page: number) => void;
    setFetching: (isFetching: boolean) => void;
    setFollowing: (following: Array<number>) => void;
}
type MyState = {
    count: number; // like this
};


class UsersContainer extends React.Component<UsersConnectedPropsType, MyState> {
    constructor(props: UsersConnectedPropsType) {
        super(props);
    }
    componentDidMount() {
        this.props.setFetching(true);
        getUser(this.props.currentPage, this.props.pageSize).then((data) => {

            this.props.setFetching(false);
            this.props.setUsersHandler([...data.items]);
            this.props.getTotalCount(data.totalCount);
         // компонент был вмантирован в DOM
        })

    }
    setUserPage(page: number)  {
        this.props.setFetching(true);
        this.props.setUsersPage(page);

        getUser(page, this.props.pageSize).then(data => {
            this.props.setFetching(false);
            this.props.setUsersHandler(data.items);
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
                    setFollowing={this.props.setFollowing}
                    followingInProgress={this.props.followingInProgress}
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
        isFetching: state.usersReducer.isFetching,
        followingInProgress: state.usersReducer.followingInProgress
    }
};

export const UsersConnectedContainer = connect(mapStateToProps,
    ({followHandler,
        unFollowHandler,
        setUsersHandler,
        getTotalCount,
        setUsersPage,
        setFetching,
        setFollowing
    })
)(UsersContainer) // в данном случае предпологается если в mapDispatchToProps передается не функция, а объект, то он автоматически будет создат функции и прокинет в них диспатч
//Todo после рефакторинга mapDispatchToProps, приложение стало работать намного быстрее