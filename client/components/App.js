import List from "./List";
import Form from "./Form";
import Registration from "./Registration";
import { hot } from 'react-hot-loader'

var React = require('react');
var createReactClass = require('create-react-class');

const App = createReactClass({
    getInitialState: function() {
        return {
          users:[]
        };
    },
    //
    // componentDidMount() {
    //     fetch('/users')
    //         .then(res => res.json())
    //         .then(users => {
    //             this.setState({users: users});
    //             console.log(users);
    //         })
    // },

    render: function() {
        return (
            <div>
            <div className="row mt-5">
                <div className="col-md-3 offset-md-1">
                    <h2>Articles</h2>
                    <List/>
                </div>
                <div className="col-md-3 offset-md-1">
                    <h2>Add a new article</h2>
                    <Form/>
                </div>
                {/*<div lassName="col-md-3 offset-md-1">*/}
                {/*{ this.state.users.map(user =>*/}
                    {/*<div> {user.name} - {user.email} </div>*/}
                {/*)*/}
                {/*}*/}
                {/*</div>*/}
            </div>
                <Registration />
            </div>
            );
    }
});
export default hot(module)(App)

