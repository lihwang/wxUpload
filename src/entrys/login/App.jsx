/**
 * @description 登陆
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login'
import Agreement from './Agreement'
// import 
export class App extends EntryBase {
// export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path="/Login" component={Login} />
                        <Route path="/" component={Agreement} />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default App;