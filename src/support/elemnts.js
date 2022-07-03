const defineWebComponent = (tagName, element, parentType) => {
    console.log('初始化组件：', tagName);
    if (customElements && !customElements.get(tagName)) {
        if (parentType) {
            customElements.define(tagName, element, { extends: parentType });
        } else {
            customElements.define(tagName, element);
        }
    }
};

module.exports = defineWebComponent;

(() => {

    console.group('初始化内置组件');

    class LegoButton extends HTMLButtonElement {

    }

    defineWebComponent('lego-button', LegoButton, 'button');


    class LegoToolbar extends HTMLDivElement {

    }

    defineWebComponent('lego-toolbar', LegoToolbar, 'div');

    console.groupEnd();
})()