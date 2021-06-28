 import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import {Content} from "./Content/Content";
import {Footer} from "./Footer/Footer";
import {Navigation} from "./Nav/Navigation";
import {Header} from "./Header/Header";
 import {UsersContainer} from "./Users/UsersContainer";
import {DialogsContainer} from "./Dialogs/DialogsContainer";
 import style from './App.module.css';


type AppPropsType = {

}
function App({...props}:AppPropsType) {
  return (
      <div className={style.App}>
        <Header />
        <Navigation />
        <div className={style.AppWrapper}>
            <Route exact path={'/'}><Redirect to='/Profile' /></Route>
            <Route  path='/Dialogs' render={ () => <DialogsContainer page={1}  isActive={false}/> }/>
            <Route  path='/Profile' render={ () => <Content /> }/>
            <Route  path={'/users'} render={ () => <UsersContainer />} />
        </div>
        <Footer />
    </div>
  );
}

export default React.memo(App);
 //todo узнать зачем в пропсах key