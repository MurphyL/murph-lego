const htm = require('htm');

function h(type, props, ...children) {
    return { type, props, children };
}

const html = htm.bind(h);

class LegoError extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('Custom square element added to page.');
        console.log(this.getAttribute('message'));
        this.classList.add(this.nodeName.toLowerCase());
        console.log(this);
    }

}

customElements.define('lego-error', LegoError);

const render = (vtree = { type: 'div' }, root) => {
    const { type, children, props } = vtree;
    const element = document.createElement(type);
    props && Object.keys(props).forEach(property => {
        element.setAttribute(property, props[property]);
    });
    Array.isArray(children) && children.forEach(child => {
        if (!child) {
            return;
        }
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            render(child, element);
        }
    });
    root && root.appendChild(element);
};

module.exports = function (el, config = {}) {
    const { component = 'div', jsx } = config;
    if (component === 'Error') {
        render({ type: 'lego-error', config }, document.querySelector(el));
    } else if (jsx) {
        render(html([jsx]), document.querySelector(el));
    } else {
    }
}