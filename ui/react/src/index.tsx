import React from 'react';
import ReactDOM from 'react-dom';
import {GLOBAL} from "./commons/GLOBAL";
import {GenesisComponent} from "./components/genesis";
import {LoginRoot} from "./components/loginRoot";

export const renderApp = () => {
    if (GLOBAL.isLoggedIn) {
        ReactDOM.render(<GenesisComponent/>, document.getElementById('app'));
    } else {
        ReactDOM.render(<LoginRoot/>, document.getElementById('app'));
    }
};

renderApp();
