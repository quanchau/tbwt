//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import ConfirmationPage from './components/ConfirmationPage';
import NoMatch from './components/NoMatch';
import Registration from './components/Registration';
import LoginPage from './components/LoginPage';

export const Routes = () => (
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={LoginPage} />
        <Route path='/registration' component={Registration}/>
        <Route exact path='/confirmation/:token' component={ConfirmationPage} />
        <Route component={NoMatch}/>
    </Switch>
);
export default Routes;