//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import ConfirmationPage from './components/ConfirmationPage';
import NoMatch from './components/NoMatch';
import Registration from './components/Registration';
import LoginPage from './components/LoginPage';
import PasswordReset from './components/PasswordReset';
import PasswordResetConfirmation from './components/PasswordResetConfirmation';
import PostQuestion from './components/PostQuestion';


export const Routes = () => (
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={LoginPage} />
        <Route path='/registration' component={Registration}/>
        <Route exact path='/confirmation/:token' component={ConfirmationPage} />
        <Route exact path='/reset-password' component={PasswordReset} />
        <Route exact path='/reset-password/:token' component={PasswordResetConfirmation} />
        <Route exact path='/post-question' component={PostQuestion} />
        <Route component={NoMatch}/>
    </Switch>
);
export default Routes;