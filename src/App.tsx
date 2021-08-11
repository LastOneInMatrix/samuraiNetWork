import React, {useEffect} from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import {Footer} from "./Components/Footer/Footer";
import {Navigation} from "./Components/Nav/Navigation";
import {UsersConnectedContainer} from "./Users/UsersContainer";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import style from './App.module.css';
import {ConnectedContentContainer} from "./Components/Content/ContentContainer";
import {HeaderConnectedComponent} from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {getUserLoginDataThunkCreator} from "./State/authReducer/actions";
import {initialize} from "./State/app-reducer";
import {AppStateType} from "./State/redux-store";
import {Preloader} from "./Common/Preloader/Preloader";


type AppPropsType = {}

function App({...props}: AppPropsType) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialize());
    }, [])

    const intizlized = useSelector<AppStateType, boolean>(state => state.appReducer.initialized);

    if (!intizlized) {
    return <Preloader/>
    }
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
