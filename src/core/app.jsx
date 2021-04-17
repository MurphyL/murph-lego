import React from 'react';
import { Route, Switch } from "wouter";


import Designer from 'view/designer/v2/designer.v2.module.jsx';
import Visualiser from 'view/visualiser/v1/visualiser.v1.module.jsx';

import ErrorBoundary from 'utils/error.boundary.jsx';

function App() {
    return (
        <ErrorBoundary fallback={<h2>出错了</h2>}>
            <Switch>
                <Route path="/lego/designer" component={Designer} />
                <Route path="/lego/v1/:unique" component={Visualiser} />
                <Route>
                    <div>404</div>
                </Route>
            </Switch>
        </ErrorBoundary>
    );
}

export default App;
