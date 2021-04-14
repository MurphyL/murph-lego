import { useEffect, useState } from 'react';

import { schemaAjax } from 'utils/dynamic.utils';

import { Spinner } from 'utils/dynamic.utils.jsx';

import { Skeleton } from '../extra.plug.jsx';

const AjaxModule = ({ promise, children }) => {
    const [{ code, payload }, setState] = useState({ code: -1 });
    useEffect(() => {
        promise && schemaAjax(promise).then(setState);
    }, [promise]);
    if (code < 0) {
        return (
            <Spinner message="数据加载中……" />
        );
    }
    if (code > 0) {
        return (
            <div>数据加载失败！</div>
        );
    }
    return (typeof (children) === 'function') ? children(payload) : children;
};

const AsyncModule = ({ promise, children }) => {
    return (
        <Skeleton>
            <AjaxModule promise={promise}>{children}</AjaxModule>
        </Skeleton>
    );
};

export default AsyncModule;