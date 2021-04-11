import React from 'react';
import { Route, Switch } from "wouter";


import Designer from 'view/designer/v1/designer.v1.module.jsx';
import Visualiser from 'view/visualiser/v1/visualiser.v1.module.jsx';

import ErrorBoundary from 'utils/error.boundary.jsx';

function App() {
    return (
        <React.StrictMode>
            <ErrorBoundary fallback={<h2>Could not fetch posts.</h2>}>
                <Switch>
                    <Route path="/lego/designer" component={Designer} />
                    <Route path="/lego/v1/:unique" component={Visualiser} />
                    <Route>
                        <div>404</div>
                    </Route>
                </Switch>
            </ErrorBoundary>
        </React.StrictMode>
    );
}

export default App;
