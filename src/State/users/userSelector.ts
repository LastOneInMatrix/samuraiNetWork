import {AppStateType} from "../redux-store";

// const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//     return {
//         users: state.usersReducer.users,
//         pageSize: state.usersReducer.pageSize,
//         totalSize: state.usersReducer.totalSize,
//         currentPage: state.usersReducer.currentPage,
//         isFetching: state.usersReducer.isFetching,
//         followingInProgress: state.usersReducer.followingInProgress
//     }
// };
export const getUser = (state: AppStateType) => {
    return state.usersReducer.users
}
export const getPageSize = (state: AppStateType) => {
    return state.usersReducer.pageSize
}
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
