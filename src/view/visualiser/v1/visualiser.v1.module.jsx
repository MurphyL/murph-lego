import { useEffect, useState } from 'react';

import Layout from 'plug/layout/layout.v1.jsx';

import { Spinner, ajax, $compact } from 'utils/dynamic.utils.jsx';

const mapStruct = (parent, items) => {
    const deps = {};
    (items || []).forEach((item, index) => {
        const { ajax, children } = item;
        const prefix = (parent ? parent : []);
        const suffix = parent ? index : null;
        item._path = $compact([...prefix, suffix]);
        if (!ajax) {
            const path = [...prefix, suffix, 'children'];
            Object.assign(deps, mapStruct(path, children, index));
        }
    });
    return deps;
};

const Visualizer = ({ params }) => {
    const [config, setConfig] = useState(null);
    useEffect(() => {
        const unique = params.unique || 'hello';
        ajax({ url: `/target/v2/${unique}.json` }).then(({ payload }) => {
            mapStruct(null, [payload]);
            setConfig(payload);
        });
    }, [params.unique]);
    if (config === null) {
        return (
            <Spinner message="数据加载中……" />
        );
    }
    return (
        <Layout config={config} />
    );
};

export default Visualizer;