import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from './State/redux-store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
// rerenderEntireTree и store.subscribe(rerenderEntireTree) - we dont need this subscribe anymore, потому что теперь за нас это делает connect, он под капотом сам субскрайбиться

reportWebVitals();
