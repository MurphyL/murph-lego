import React from 'react';
import { Route, Switch } from "wouter";

import Visualizer from 'view/visualizer.v1/visualizer.v1.module.jsx';

function App() {
    return (
        <React.StrictMode>
            <Switch>
                <Route path="/lego/v1/:unique" component={Visualizer} />
                <Route>
                    <div>404</div>
                </Route>
            </Switch>
        </React.StrictMode>
    );
}

export default App;
