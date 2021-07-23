import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import {Footer} from "./Footer/Footer";
import {Navigation} from "./Nav/Navigation";
import {UsersConnectedContainer} from "./Users/UsersContainer";
import {DialogsContainer} from "./Dialogs/DialogsContainer";
import style from './App.module.css';
import {ConnectedContentContainer} from "./Content/ContentContainer";
import {HeaderConnectedComponent} from "./Header/HeaderContainer";
import {Login} from "./Login/Login";


type AppPropsType = {}

function App({...props}: AppPropsType) {
    return (
        <div className={style.App}>
            <HeaderConnectedComponent/>
            <Navigation/>
            <div className={style.AppWrapper}>
                <Route exact path={'/'}><Redirect to='/Profile'/></Route>
                <Route path='/Dialogs' render={() => <DialogsContainer  page={1} isActive={false}/>}/>
                <Route path='/Profile/:userId?' render={() => <ConnectedContentContainer defaultUserId={2}/>}/>
                <Route path={'/users'} render={() => <UsersConnectedContainer forTest={'ТЕСТ'}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </div>
            <Footer/>
        </div>
    );
}

export default React.memo(App);
