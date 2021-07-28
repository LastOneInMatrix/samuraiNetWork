import axios from "axios";
import {userType} from "../State/userReducer";
import {AuthInitialStateType} from "../State/authReducer/authReducer";

export type CommonPutType<T = number> = {
    data: {}
    messages: [],
    resultCode: T
};
export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '84c6307f-7e5a-4636-a098-ea1e899ebf82'},
})

export const getUser = (currentPage: number, pageSize: number) => {
    return axiosInstance
        .get<{ items: Array<userType>, totalCount: number }>(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data)
}

export const setFollowUnfollow = (id: number, button: 'post' | 'delete') => {
    return axiosInstance
        [button]<{ items: Array<userType>, totalCount: number }>(`follow/${id}`);
}


export const getUserProfile = (userIdFromURL: string) => {
    return axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + userIdFromURL)
}

export const getLoginInformationForHeader = () => {
    return axiosInstance.get<{ data: AuthInitialStateType, resultCode: number }>(`auth/me`);
}
export const getUserStatus = (userId: string) => {
    return axiosInstance.get<string>(`profile/status/${userId}`);
}

export const changeProfileStatus = (status: string) => {
    return axiosInstance.put<CommonPutType>(`profile/status`, {status})
}
export const login = (email: string, password: string, rememberMe: boolean)  => {
    return axiosInstance.post(`auth/login`, {email, password, rememberMe})
}
export const logOut = ()  => {
    return axiosInstance.delete(`auth/login`)
}


