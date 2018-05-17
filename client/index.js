import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./components/App";
import { HashRouter } from 'react-router-dom'
import Routes from './routes'

import "bootstrap/dist/css/bootstrap.min.css";

render(
    <Provider store={store}>
        <HashRouter>
            <Routes
            />
        </HashRouter>
    </Provider>,
    document.getElementById("app")
);
