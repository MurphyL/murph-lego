import fs from 'fs';
import path from 'path';
import toml from 'toml';

const SOURCE_ROOT = "res/";
const TARGET_ROOT = "public/build/";

const writeFile = (filepath, json) => {
    fs.writeFileSync(filepath, JSON.stringify(json, null, '\t'));
};

const resolveToml = (filepath) => {
    return toml.parse(fs.readFileSync(filepath).toString() || '');
};

(() => {
    const schema = resolveToml(path.join(SOURCE_ROOT, 'schema.toml'));
    writeFile(path.join(TARGET_ROOT, 'schema.json'), schema);
})();