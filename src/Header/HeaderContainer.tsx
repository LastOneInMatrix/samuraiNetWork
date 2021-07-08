import React from 'react';
import {usersType, userType} from "../State/userReducer";
import {setUserLoginData} from "../State/authReducer/actions";
import axios from "axios";
import {Header} from "./Header/Header";
import {AuthInitialStateType} from "../State/authReducer/authReducer";
import {AppStateType} from "../State/redux-store";
import {connect} from "react-redux";


export type MapStateToPropsType = {
    login: string | null;
    id: number | null;
    authorization: boolean;
}
export type MapDispatchToPropsType = {
    setUserLoginData: (id: number | null, login: string | null, email: string | null) => void;
}
export type HeaderContainerConnectedProps = MapStateToPropsType & MapDispatchToPropsType;
type MyState = {
    count: number; // like this
};


const axiosInstance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.0/', withCredentials: true});

class HeaderContainer extends React.Component<HeaderContainerConnectedProps,MyState> {
        componentDidMount() {
            axiosInstance.get<{data: AuthInitialStateType, resultCode: number}>(`auth/me`).then(response => {
                const {id, login, email} = response.data.data;
                    this.props.setUserLoginData(id, login, email)
            }); // компонент был вмантирован в DOM
        }

        render() {
            return <>
                <Header {...this.props}/>
            </>
        }

}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        login: state.authReducer.login,
        id: state.authReducer.id,
        authorization: state.authReducer.authorization,
    }
}

export const HeaderConnectedComponent = connect<MapStateToPropsType,MapDispatchToPropsType, {} ,AppStateType>(mapStateToProps, {
    setUserLoginData
})(HeaderContainer);
