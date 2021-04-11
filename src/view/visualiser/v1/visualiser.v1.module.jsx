import React from 'react';
import Layout from 'plug/layout/layout.v1.jsx';

import { AjaxComponent } from 'utils/async.utils.jsx';

const Visualizer = ({ params }) => {
    const unique = params.unique || 'hello';
    return (
        <AjaxComponent url={`/target/v2/${unique}.json`} render={resp => (
            <Layout config={resp} />
        )} />
    );
};

export default Visualizer;