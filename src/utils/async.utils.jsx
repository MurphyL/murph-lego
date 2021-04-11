import { useEffect, useState } from 'react';

import Spinner from 'react-spinkit';

import axios from 'axios';

export const ajax = ({ method = 'GET', url, data }) => {
    return axios({
        method, url, data: data || {}
    }).then(({ status, data }) => {
        if (status !== 200) {
            throw new Error('调用网络接口出错');
        }
        return { code: 0, payload: data };
    }).catch(err => {
        throw new Error(`调用网络接口出错：${err.message}`);
    });
};

export const ajaxGet = (url) => {
    return ajax({ method: 'GET', url });
};

export const AjaxComponent = ({ url, render }) => {
    const [state, setState] = useState(null);
    useEffect(() => {
        ajaxGet(url).then(setState);
    }, [url]);
    if (null === state || undefined === state) {
        return (
            <div className="ajax-component loading">
                <Spinner name="double-bounce" />
            </div>
        );
    }
    if (state.code) {
        return (
            <div>数据加载出错！</div>
        );
    }
    return render ? (
        <div className="ajax-component success">
            { render(state ? state.payload : null)}
        </div>
    ) : (
        <div className="ajax-component error">
            <span>数据为空</span>
        </div>
    )
}