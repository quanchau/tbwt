import React from 'react';
import {NavLink} from 'react-router-dom';

const NoMatch = (props) => (
    <div>
        <div>
            <h3> This page is not found </h3>
        </div>

        <NavLink to={"./login"}> Back to log in page </NavLink>

    </div>
)

export default NoMatch;