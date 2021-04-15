import { useEffect, useState } from 'react';

import trim from 'lodash/trim';
import pathGet from 'lodash/get';
import isFunction from 'lodash/isFunction';


import { ajax } from 'utils/dynamic.utils';

import { Spinner } from 'utils/dynamic.utils.jsx';

import { Skeleton } from '../extra.plug.jsx';

const extract = (method) => method.replace(/^ajax/, '').toLowerCase();

const AjaxModule = ({ option, path, children }) => {
    const [{ code, payload }, setState] = useState({ code: -1 });
    useEffect(() => {
        option && ajax(option).then(setState);
    }, [option]);
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
    const data = path.length ? pathGet(payload, path) : payload;
    return isFunction(children) ? children(data) : children;
};

const AsyncModule = ({ fetch: [method, url, path], children }) => {
    if (method === 'dataset') {
        return (
            <div>暂不支持静态数据图表！</div>
        );
    }
    return (
        <Skeleton>
            <AjaxModule option={{ method: extract(method), url }} path={trim(path)}>
                {children}
            </AjaxModule>
        </Skeleton>
    );
};

export default AsyncModule;