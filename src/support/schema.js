const Ajv = require("ajv");

module.exports.validate = function (schema, data) {
    if (!schema || !data) {
        return { success: failure, errors: [{ message: 'schema or data is null' }] };
    }
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const result = { success: validate(data) };
    if (!result.success) {
        result.errors = (validate.errors || []).map(({ instancePath, message }) => {
            return { path: instancePath, message: (message || '').toLowerCase() };
        })
    }
    return result;
}