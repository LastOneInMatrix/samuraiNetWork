import {combineReducers, createStore} from "redux";
import {addMessagesActionCreator, changeMessageTextActionCreator, dialogReducer} from "./dialogReducer";
import {addPostActionCreator, changeTextActionCreator, profileReducer} from "./profileReducer";
import {showSidebarActionCreator, sidebarReducer} from "./sidebarReducer";

export type ActionsType =
    ReturnType<typeof changeMessageTextActionCreator> |  //returnType - берет у типа функции и отсекает только возвращаемую часть
    ReturnType<typeof addMessagesActionCreator> |
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof changeTextActionCreator>|
    ReturnType<typeof showSidebarActionCreator>;  // typeof - берет полностью функцию и создает для нее конретный тип

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebar: sidebarReducer
});
console.log(reducers)

//type RootReducerType = typeof reducers //(state: AppStateTYPE) => AppStateTYPE;
    export type AppStateType = ReturnType<typeof reducers>; //тип стейта ----
export type AppStoreType = typeof store
// rootReducer - это функция, которая возвращает state всего приложения.
// И чтобы вернуть то, что возвращает функция воспользуем ReturnType
// Чтобы динамически создать тип который нам возвращает rootReducer, воспользуемся оператором ReturnType
// Оператор ReturnType анализирует тип переданный в нее функции (rootReducer) и берет ее возвращаемый тип

export let store = createStore(reducers);
