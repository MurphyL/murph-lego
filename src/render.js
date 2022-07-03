(() => {

    const defineWebComponent = require('./support/elemnts')

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
                        this.render(data);
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

        render(schema = {}) {
            this.isDebugEnable && console.group('开始渲染应用');
            console.log('应用描述信息：', schema);
            try {
                if (schema.router) {
                    this.createRouter(schema.router)
                }
                if (!this.routes) {
                    console.error('当前应用尚未配置任何路由规则，无法正常显示');
                    return;
                }
                const { view } = this.routes[location.pathname] || {};
                const element = view ? this.buildTree(view, { className: 'router-root', 'data-path': '$' }) : this.buildTree({ component: 'lego-error', message: '视图未配置' });
                this.shadow.appendChild(element);
            } catch (e) {
                console.error('渲染视图出错：', e);
            } finally {
                this.isDebugEnable && console.groupEnd();
            }
        }

        buildTree({ component = 'div', children, ...options }, extra = {}) {
            const element = document.createElement(component);
            if (typeof children === 'string') {
                element.appendChild(document.createTextNode(children));
            } else if (Array.isArray(children)) {
                for (let index in children) {
                    element.appendChild(this.buildTree(children[index], { 'data-path': [extra['data-path'], index].join('.') }));
                }
            }
            const { className, ...presets } = extra;
            className && element.classList.add(className);
            options.class && element.classList.add(options.class);
            const props = { ...options, ...presets };
            props && Object.keys(props).forEach(key => {
                if (key === 'class') {
                    return;
                }
                element.setAttribute(key, props[key]);
            });
            return element;
        }

        createRouter(definition) {
            this.isDebugEnable && console.log('正在构造路由', definition);
            const root = definition.path || '/';
            const path = require('path');
            this.routes = {};
            if (Array.isArray(definition.routes)) {
                for (let route of definition.routes) {
                    this.routes[path.join(root, route.path)] = route;
                }
            }
        }

    }
    defineWebComponent('lego-app', LegoApp);
})()