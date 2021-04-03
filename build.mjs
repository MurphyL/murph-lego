import fs from 'fs';
import path from 'path';
import toml from 'toml';
import dayjs from 'dayjs';

const SOURCE_ROOT = "res/";
const TARGET_ROOT = "public/build/";

const writeFile = (filepath, json) => {
    if(fs.existsSync(filepath)) {
        fs.truncateSync(filepath);
    }
    fs.writeFileSync(filepath, JSON.stringify(json, null, '  '));
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
    buildSource('schema.v1.toml', 'schema.json');
    buildSource('mock/test.toml', 'test_mock.json');
    buildSource('mock/table_resp.toml', 'table_resp.json');
    buildSource('view/hello_chart.toml', 'view_chart.json');
    buildSource('view/hello_table.toml', 'view_table.json');
})();