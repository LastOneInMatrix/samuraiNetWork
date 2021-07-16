import axios from "axios";
import {userType} from "../State/userReducer";

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers:{'API-KEY': 'a8a869e7-f94e-4a9a-a53f-4ef40e96d952'},
})

export const getUser = (currentPage: number, pageSize: number) => {
    return axiosInstance
        .get<{items: Array<userType>, totalCount: number}>(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data)
}

export const setFollowUnfollow = (id: number, button: 'post' | 'delete') => {
    return axiosInstance
        [button]<{items: Array<userType>, totalCount: number}>(`follow/${id}`);
}



