import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './store/reducers';
import App from './App';

// styles
import 'bootstrap/dist/css/bootstrap.css';
import './assets/sass/style.scss'

const store = createStore(reducers, applyMiddleware(thunk));
// store.getState();
// store.subscribe(() => store.getState());
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
