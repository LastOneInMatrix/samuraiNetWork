import {AppStateType, store} from './State/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const state:AppStateType = store.getState();

export let rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} store={store}  dispatch={store.dispatch.bind(store)}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
};

rerenderEntireTree();
store.subscribe(rerenderEntireTree)

reportWebVitals();
