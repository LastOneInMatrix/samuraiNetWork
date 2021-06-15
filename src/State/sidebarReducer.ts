import {ActionsType} from "./redux-store";

let initialState = {};

const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const showSidebarActionCreator = (toggleValue: boolean) => ({type: SHOW_SIDEBAR, toggleValue} as const)
export const sidebarReducer = (state = initialState, action: ActionsType) => {
   return state;
}