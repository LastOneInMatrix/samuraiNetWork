 import React from 'react';
import {
    Route,
    BrowserRouter,
    Redirect
} from "react-router-dom";
import {ActionsType, rootStateType,} from "./State/MyReduxStore";

import {Content} from "./Content/Content";
import {Footer} from "./Footer/Footer";
import {Navigation} from "./Nav/Navigation";
import {Header} from "./Header/Header";

import style from './App.module.css';
 import {AppStoreType} from "./State/redux-store";
 import {DialogsContainer} from "./Dialogs/DialogsContainer";


type AppPropsType = {
    state: rootStateType;
    dispatch: (action: ActionsType) => void;
    store: AppStoreType;
}
function App({state,  dispatch, ...props}:AppPropsType) {
  return (
      <BrowserRouter >
    <div className={style.App}>
        <Header />
        <Navigation />
        <div className={style.AppWrapper}>
            <Route exact path={'/'}><Redirect to='/Profile' /></Route>
            <Route  path='/Dialogs' render={ () => <DialogsContainer page={2} store={props.store}/> }/>
            <Route  path='/Profile' render={ () => <Content store={props.store} /> }/>
        </div>
        <Footer />
    </div>
      </BrowserRouter >
  );
}

export default App;
