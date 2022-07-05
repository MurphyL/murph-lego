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
            const mithril = require('mithril');
            this.elements = require('./core/elements');
            this.createElement = mithril;
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
                const routePath = path.join('/', route.path || '');
                router[routePath] = {
                    view: () => this.createComponent(route.view, `$[route=${routePath}]`)
                };
            }
            return [path.join('/', root || ''), router];
        }

        createElement() {

        }

        createComponent({ component = 'div', children, ...props }, path) {
            const elements = [];
            if (this.elements[component]) {
                if (typeof children === 'string') {
                    elements.push({ tag: '#', children });
                } else if (Array.isArray(children)) {
                    children.forEach(child => elements.push(this.createComponent(child, `${path}.${component}`)))
                }
                const attrs = { ...props, 'data-type': 'lego-prepare', key: `${path}.${component}` };
                return this.createElement(this.elements[component], attrs, elements);
            } else {
                if (typeof children === 'string') {
                    elements.push({ tag: '#', children });
                } else if (Array.isArray(children)) {
                    children.forEach(child => elements.push(this.createComponent(child, `${path}.${component}`)));
                }
                const attrs = { ...props, 'data-type': 'lego-component', key: `${path}.${component}` };
                return { tag: component, attrs, children: elements };
            }
        }

    }

    if (customElements && !customElements.get('lego-app')) {
        customElements.define('lego-app', LegoApp);
    }

})()