import React from 'react';

import axios from 'axios';

export const ajax = ({ method = 'get', url, data }) => {
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

export const $join = (items) => {
    return ['/', ...$compact(items)].join('/');
};

export const $compact = (items) => {
    return (items || []).filter(item => null != item);
};

const If = ({ condition = false, children }) => (
    condition ? children : null
);

const Dynamic = ({ items, message }) => {
    if (React.Children.count(items)) {
        return items;
    }
    return (
        <div>{message || '空元素'}</div>
    );
};

export const Spinner = ({ message }) => (
    <div className="lego-spinner">
        <img src="/squares.svg" alt="loading" />
        <If condition={message}>
            <span>{message}</span>
        </If>
    </div>
);

export const Skeleton = ({ children, show, ...extra }) => {
    console.log(extra);
    const { width = 300, height = 260 } = extra;
    if (show) {
        return (typeof (children) === 'function') ? children() : children;
    }
    return (
        <div className="lego-skeleton-v1" style={{ height: `${height}px`, width: `${width}px` }} />
    );

};

export default Dynamic;