import {AppStateType} from "../redux-store";
import {createSelector} from "reselect";

// const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//     return {
//         users: state.usersReducer.users,
//         pageSize: state.usersReducer.pageSize,
//         totalSize: state.usersReducer.totalSize,
//         currentPage: state.usersReducer.currentPage,
//         isFetching: state.usersReducer.isFetching,
//         followingInProgress: state.usersReducer.followingInProgress
//     } --------------------ПРОБЛЕМА В ТОМ ЧТО НАШИ СЕЛЕКТОРЫ МОГУН НАПРИМЕР ФИЛЬТРОВАТЬ И ДЕЛАТЬ ЭТО ИММУТАБЕЛЬНО, ИЛИ СЛОЖНЫЕ ОПЕРАЦИИ, КОТОРЫЕ КАЖДЫЙ РАЗ ПРО ОБНОВЛЕНИИ СТЕЙТА БУДУТ ЗАПУСКАТЬ maptostate
// };
const getUserSelector = (state: AppStateType) => {
    return state.usersReducer.users
}

export const getPageSize = (state: AppStateType) => {
    return state.usersReducer.pageSize
}
export const getUser = createSelector([getUserSelector, getPageSize], (user, pageSizes) => {
    return user.filter(u => true)
})
export const getTotalSize = (state: AppStateType) => {
    return state.usersReducer.totalSize
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersReducer.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersReducer.isFetching
}

export const getFollowingProgress = (state: AppStateType) => {
    return state.usersReducer.followingInProgress
}
