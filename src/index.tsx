import {AppStateType, store} from './State/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "./StoreContext";


export let rerenderEntireTree = () => {
    ReactDOM.render(
            <Provider store={store}>
                 <React.StrictMode>
                     <App />
                </React.StrictMode>
            </Provider>,
        document.getElementById('root')
    );
};

rerenderEntireTree();
store.subscribe(rerenderEntireTree)

reportWebVitals();
