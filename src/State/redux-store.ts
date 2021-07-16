import {applyMiddleware, combineReducers, createStore} from "redux";
import {addMessagesActionCreator, changeMessageTextActionCreator, dialogReducer} from "./dialogReducer";
import thunk from "redux-thunk";
import {
    addPost,
    updateNewPostText,
    profileReducer, setUserInfo
} from "./profileReducer";
import {showSidebarActionCreator, sidebarReducer} from "./sidebarReducer";
import {
    followHandler,
    getTotalCount,
    setFetching, setFollowing,
    setUsersHandler,
    setUsersPage,
    unFollowHandler,
    usersReducer
} from "./userReducer";
import {AuthReducerActionsType} from "./authReducer/actions";
import {authReducer} from "./authReducer/authReducer";


export type ActionsType =
    ReturnType<typeof changeMessageTextActionCreator> |  //returnType - берет у типа функции и отсекает только возвращаемую часть
    ReturnType<typeof addMessagesActionCreator> |
    ReturnType<typeof addPost> |
    ReturnType<typeof updateNewPostText> |
    ReturnType<typeof showSidebarActionCreator> |
    ReturnType<typeof followHandler>|
    ReturnType<typeof unFollowHandler>|
    ReturnType<typeof setUsersHandler>|
    ReturnType<typeof setUsersPage>|
    ReturnType<typeof getTotalCount>|
    ReturnType<typeof setFetching>|
    ReturnType<typeof setUserInfo>|
    ReturnType<typeof setFollowing>|
    AuthReducerActionsType;  // typeof - берет полностью функцию и создает для нее конретный тип

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebar: sidebarReducer,
    usersReducer: usersReducer,
    authReducer: authReducer
});
export type AppStateType = ReturnType<typeof rootReducers> //тип стейта


// rootReducer - это функция, которая возвращает state всего приложения.
// И чтобы вернуть то, что возвращает функция воспользуем ReturnType
// Чтобы динамически создать тип который нам возвращает rootReducer, воспользуемся оператором ReturnType
// Оператор ReturnType анализирует тип переданный в нее функции (rootReducer) и берет ее возвращаемый тип

export let store = createStore(rootReducers, applyMiddleware(thunk));
export type AppStoreType = typeof store // тип стор - должен стоять после создания createStore(rootReducers)
export type AppDispatch = typeof store.dispatch

declare global {
    interface Window {
        store:any;
    }
}

// @ts-ignore
window.store = store;