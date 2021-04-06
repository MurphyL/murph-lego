import fs from 'fs';
import path from 'path';
import toml from 'toml';
import dayjs from 'dayjs';
import mkdirp from 'mkdirp';

const SOURCE_ROOT = "res/";
const TARGET_ROOT = "public/build/";

mkdirp.sync(path.join(TARGET_ROOT, 'schema'));
mkdirp.sync(path.join(TARGET_ROOT, 'target/v1'));

const writeFile = (filepath, json) => {
    if(fs.existsSync(filepath)) {
        fs.truncateSync(filepath);
    }
    const content = JSON.stringify(json, null, '  ');
    fs.writeFileSync(filepath, content);
};

const resolveToml = (filepath) => {
    return toml.parse(fs.readFileSync(filepath).toString() || '');
};

const buildSource = (source, target) => {
    const filepath = path.join(SOURCE_ROOT, source);
    const result = resolveToml(filepath);
    Object.assign(result, { ts: dayjs().unix(), filepath })
    writeFile(path.join(TARGET_ROOT, target), result); 
    console.log(`- ${source} -> ${target}`);
};

(() => {
    buildSource('schema/vega-lite.v2.toml', 'schema/vega-lite.v2.json');
    buildSource('specific/v1/url-data.toml', 'target/v1/url-data.json');
    buildSource('specific/v1/inline-data.toml', 'target/v1/inline-data.json');
})();