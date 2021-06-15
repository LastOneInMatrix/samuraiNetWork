import {combineReducers, createStore} from "redux";
import {dialogReducer} from "./dialogReducer";
import {profileReducer} from "./profileReducer";
import {sidebarReducer} from "./sidebarReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebar: sidebarReducer
})
export let store = createStore(reducers);

export {};