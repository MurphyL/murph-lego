(() => {

    class LegoApp extends HTMLElement {

        constructor() {
            super();
            if (!this.hasAttribute('manifests')) {
                throw new Error('未指定资源清单');
            }
            // 封闭 DOM，避免外部样式及资源干扰
            this.shadow = this.attachShadow({ mode: 'closed' });
            this.isDebugEnable = this.hasAttribute('debug');
        }

        connectedCallback() {
            const manifests = this.getAttribute('manifests');
            if (this.isDebugEnable) {
                console.log('加载应用描述信息：', manifests);
            }
            const axios = require('axios');
            axios.get(manifests).then(({ status, data }) => {
                if (status === 200) {
                    const definition = require('./core/schema.json');
                    const { validate } = require('./support/schema');
                    const { success, errors } = validate(definition, data);
                    if (success) {
                        this.isDebugEnable && console.group('开始渲染应用');
                        console.log('应用描述信息：', data);
                        try {
                            if (!data.router || !Array.isArray(data.router.routes)) {
                                return console.error('当前应用尚未配置任何路由规则，无法正常显示');
                            }
                            const [root, router] = this.createRouter(data.router);
                            const mithril = require('mithril');
                            mithril.route(this.shadow, root, router);
                        } catch (e) {
                            console.error('渲染视图出错：', e);
                        } finally {
                            this.isDebugEnable && console.groupEnd();
                        }
                    } else {
                        console.error('资源清单配置错误', data, errors);
                    }
                } else {
                    console.error('加载资源清单加载出错', status, data);
                }
            }).catch(err => {
                console.error('加载资源清单时发生未知错误', err);
            })
        }

        createRouter({ path: root, routes }) {
            const path = require('path-browserify');
            const router = {};
            for (let route of (routes || [])) {
                router[path.join('/', route.path || '')] = {
                    view: () => this.createComponent(route.view)
                };
            }
            return [path.join('/', root || ''), router];
        }

        createComponent({ component = 'div', children, ...props }) {
            const attrs = { ...props, 'data-type': 'lego-component' };
            if (typeof children === 'string') {
                return { tag: component, attrs, children: [{ tag: '#', children }] };
            }
            if (Array.isArray(children)) {
                for (let index in children) {
                    children[index] = this.createComponent(children[index]);
                }
                return { tag: component, attrs, children };
            } else {
                return { tag: component, attrs };
            }
        }

    }

    if (customElements && !customElements.get('lego-app')) {
        customElements.define('lego-app', LegoApp);
    }

})()