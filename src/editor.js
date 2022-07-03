(() => {
    class LegoEditor extends HTMLElement {

        constructor() {
            super();
            if (!this.hasAttribute('manifests')) {
                throw new Error('未指定资源清单');
            }
            // 封闭 DOM，避免外部样式及资源干扰
            this.attachShadow({ mode: 'closed' });
        }

        connectedCallback() {

        }

    }

    customElements.define('lego-editor', LegoEditor);
})()