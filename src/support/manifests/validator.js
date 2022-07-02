const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const rootSchema = require('./schema.json');

module.exports = function (data = {}) {
    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(rootSchema);
    const result = { success: validate(data) };
    if (!result.success) {
        result.errors = (validate.errors || []).map(({ instancePath, message }) => {
            return { path: instancePath, message: (message || '').toLowerCase() };
        })
    }
    return result;
}