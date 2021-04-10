import fs from 'fs';
import path from 'path';
import toml from 'toml';
import dayjs from 'dayjs';
import shelljs from 'shelljs';

const SOURCE_ROOT = "res/";
const TARGET_ROOT = "public/";

const deps = {
    'chart/engine/echarts': 'node_modules/echarts/dist/*',
    'chart/engine/antv/g2': 'node_modules/@antv/g2/dist/*',
}


Object.keys(deps).forEach(key => {
    const root = path.join(TARGET_ROOT, key);
    shelljs.rm('-rf', root);
    shelljs.mkdir('-p', root);
    shelljs.cp('-Rf', deps[key], root);
})

shelljs.mkdir('-p', path.join(TARGET_ROOT, 'mock'));
shelljs.mkdir('-p', path.join(TARGET_ROOT, 'schema'));
shelljs.mkdir('-p', path.join(TARGET_ROOT, 'target/v1'));
shelljs.mkdir('-p', path.join(TARGET_ROOT, 'target/v2'));

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
    buildSource('mock/series.mock.v1.toml', 'mock/series.mock.v1.json');
    buildSource('schema/bigscreen_1.0.toml', 'schema/bigscreen.1.0.json');
    buildSource('schema/query-list_1.0.toml', 'schema/query-list.1.0.json');
    buildSource('specific/v1/url-data.toml', 'target/v1/url-data.json');
    buildSource('specific/v1/inline-data.toml', 'target/v1/inline-data.json');
    buildSource('specific/v2/bigscreen.v1.toml', 'target/v2/bs_v1.json');
    buildSource('specific/v2/query-list.v1.toml', 'target/v2/ql_v1.json');
})();