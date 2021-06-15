import React from 'react';
import {
    Route,
    BrowserRouter,
    Redirect
} from "react-router-dom";
import {ActionsType, rootStateType,} from "./State/redux";

import {Content} from "./Content/Content";
import {Footer} from "./Footer/Footer";
import {Navigation} from "./Nav/Navigation";
import {Header} from "./Header/Header";
import {Dialogs} from "./Dialogs/Dialogs";

import style from './App.module.css';


type AppPropsType = {
    state: rootStateType;
    dispatch: (action: ActionsType) => void;
}
function App({state, dispatch}:AppPropsType) {
  return (
      <BrowserRouter >
    <div className={style.App}>
        <Header />
        <Navigation />
        <div className={style.AppWrapper}>
            <Route exact path={'/'}><Redirect to='/Profile' /></Route>
            <Route  path='/Dialogs' render={ () => <Dialogs page={2} dispatch={dispatch} dialogs={state.dialogPage.dialogsData} messages={state.dialogPage.messagesData} newMessageText={state.dialogPage.newMessageText}/> }/>
            <Route  path='/Profile' render={ () => <Content dispatch={dispatch} newPostText={state.profilePage.newPostText} posts={state.profilePage.posts}/> }/>
        </div>
        <Footer />
    </div>
      </BrowserRouter >
  );
}

export default App;
