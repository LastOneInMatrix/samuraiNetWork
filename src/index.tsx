import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from './State/redux-store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';


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
