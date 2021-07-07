import React, { useEffect, useState } from 'react';

import { ajax } from 'utils/dynamic.utils';

import JsonSchema from 'react-json-schema';

import components from 'view/component/v1/lego.v1';

import ErrorBoundary from 'utils/error.boundary.jsx';

const LegoApplication = () => {
    const [meta, setMeta] = useState(null);
    useEffect(() => {
        ajax({ url: process.env.REACT_APP_META_URL }).then(setMeta)
    }, []);
    if (!meta) {
        return '数据查询中……';
    }
    const { code, payload } = meta;
    if (code) {
        return '查询数据错误';
    }
    const view = new JsonSchema();
    view.setComponentMap(components);
    return (
        <ErrorBoundary fallback={<h2>出错了</h2>}>
            { view.parseSchema(payload) }
        </ErrorBoundary>
    );
};

export default LegoApplication;
