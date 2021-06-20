import {combineReducers, createStore} from "redux";
import {addMessagesActionCreator, changeMessageTextActionCreator, dialogReducer} from "./dialogReducer";
import {addPostActionCreator, changeTextActionCreator, profileReducer} from "./profileReducer";
import {showSidebarActionCreator, sidebarReducer} from "./sidebarReducer";
import {followAC, setUsersAC, unFollowAC, usersReducer} from "./userReducer";

export type ActionsType =
    ReturnType<typeof changeMessageTextActionCreator> |  //returnType - берет у типа функции и отсекает только возвращаемую часть
    ReturnType<typeof addMessagesActionCreator> |
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof changeTextActionCreator> |
    ReturnType<typeof showSidebarActionCreator> |
    ReturnType<typeof followAC>|
    ReturnType<typeof unFollowAC>|
    ReturnType<typeof setUsersAC>;  // typeof - берет полностью функцию и создает для нее конретный тип

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebar: sidebarReducer,
    usersReducer: usersReducer
});
export type AppStateType = ReturnType<typeof rootReducers> //тип стейта


// rootReducer - это функция, которая возвращает state всего приложения.
// И чтобы вернуть то, что возвращает функция воспользуем ReturnType
// Чтобы динамически создать тип который нам возвращает rootReducer, воспользуемся оператором ReturnType
// Оператор ReturnType анализирует тип переданный в нее функции (rootReducer) и берет ее возвращаемый тип

export let store = createStore(rootReducers); //todo узнать как типизировать store
export type AppStoreType = typeof store // тип стор - должен стоять после создания createStore(rootReducers)


declare global {
    interface Window {
        store:any;
    }
}

// @ts-ignore
window.store = store;