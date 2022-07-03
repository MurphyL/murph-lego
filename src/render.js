(() => {
    class LegoApp extends HTMLElement {

        constructor() {
            super();
            if (!this.hasAttribute('manifests')) {
                throw new Error('未指定资源清单');
            }
            // 封闭 DOM，避免外部样式及资源干扰
            this.attachShadow({ mode: 'closed' });
        }

        connectedCallback() {
            const axios = require('axios');
            axios.get(this.getAttribute('manifests')).then(({ status, data }) => {
                if (status === 200) {
                    console.log('加载资源清单加载完成', data);
                } else {
                    console.error('加载资源清单加载出错', status, data);
                }
            }).catch(err => {
                console.error('加载资源清单时发生未知错误', err);
            })
        }

    }

    customElements.define('lego-app', LegoApp);
})()