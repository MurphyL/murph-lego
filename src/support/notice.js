module.exports.error = function (message, ...optionalParams) {
    document.write(`Error: ${message}${optionalParams ? JSON.stringify(optionalParams) : ''}`)
};

module.exports.log = {
    info: console.log,
    debug: console.debug
};
