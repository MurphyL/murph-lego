module.exports = {
    Button: {
        view: function ({ attrs = {}, children }) {
            return {
                tag: 'button', attrs: { ...attrs, style: `margin: 3px 5px; padding: 3px 5px;` }, children
            };
        }
    },
    Toolbar: {
        view: function ({ attrs = {}, children }) {
            return { tag: 'div', attrs: { ...attrs, style: `display: flex; margin: 3px 5px;` }, children }
        }
    }
}