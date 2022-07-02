((entry) => {
    if (!entry) {
        document.write('请使用 data-main 定义资源清单');
        return;
    }
    const url = entry.getAttribute('data-main');
    if (!url) {
        document.write('未明确指定资源清单来源');
        return;
    }
    const axios = require('axios');
    axios.get(url).then(({ data }) => {
        const validate = require('./support/manifests/validator.js');
        const { success, errors } = validate(data);
        if (success) {
            require('./core/app.js')(data);
        } else {
            document.write(`资源清单验证不通过：${JSON.stringify(errors)}`);
        }
    }).catch(err => {
        document.write(`加载资源清单出错：${err.message}`);
    });
})(document.querySelector('[data-main]'))