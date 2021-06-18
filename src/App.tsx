 import React from 'react';
import {
    Route,
    BrowserRouter,
    Redirect
} from "react-router-dom";
import {Content} from "./Content/Content";
import {Footer} from "./Footer/Footer";
import {Navigation} from "./Nav/Navigation";
import {Header} from "./Header/Header";
import style from './App.module.css';
import {DialogsContainer} from "./Dialogs/DialogsContainer";


type AppPropsType = {

}
function App({...props}:AppPropsType) {
  return (
      <BrowserRouter >
    <div className={style.App}>
        <Header />
        <Navigation />
        <div className={style.AppWrapper}>
            <Route exact path={'/'}><Redirect to='/Profile' /></Route>
            <Route  path='/Dialogs' render={ () => <DialogsContainer page={2} /> }/>
            <Route  path='/Profile' render={ () => <Content /> }/>
        </div>
        <Footer />
    </div>
      </BrowserRouter >
  );
}

export default App;
