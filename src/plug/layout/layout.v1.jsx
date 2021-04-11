import JsonSchema from 'react-json-schema';

import Toolbar from './controls/toolbar.v1/toolbar.v1.module.jsx';

import Container from './controls/container.v1/container.v1.module.jsx';

import Bigscreen from './controls/bigscreen.v1/bigscreen.v1.module.jsx';
import Form, { FormControl } from './controls/form.v1/form.v1.module.jsx';
import Datagrid from './controls/datagrid.v1/datagrid.v1.module.jsx';
import Chart from './controls/chart.v1/chart.v1.module.jsx';




const Layout = ({ config }) => {
    const { component = 'empty', ...schema } = config;
    const view = new JsonSchema();
    view.setComponentMap({
        Bigscreen,
        Container,
        Form,
        FormControl,
        Toolbar,
        Datagrid,
        Chart,
    });
    return view.parseSchema({ ...schema, component });
}

export default Layout;