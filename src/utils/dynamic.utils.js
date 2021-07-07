import axios from 'axios';

export const ajax = ({ method = 'get', url, data }) => {
    return axios({ method, url, data: data || {} })
        .then(({ status, data }) => {
            if (status !== 200) {
                throw new Error('调用网络接口出错');
            }
            return { code: 0, payload: data };
        }).catch(err => {
            throw new Error(`调用网络接口出错：${err.message}`);
        });
};