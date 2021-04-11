import React from 'react';
import { Route, Switch } from "wouter";

import LegoEditor from 'view/editor.v1/editor.v1.module.jsx';
import LegoRender from 'view/render.v1/render.v1.module.jsx';


function App() {
    return (
        <React.StrictMode>
            <Switch>
                <Route path="/lego/editor" component={LegoEditor} />
                <Route path="/lego/v1/:unique" component={LegoRender} />
                <Route>
                    <div>404</div>
                </Route>
            </Switch>
        </React.StrictMode>
    );
}

export default App;
