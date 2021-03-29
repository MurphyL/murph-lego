import { getContext } from "svelte";
import pathGet from "lodash/get";

export const configPathGet = (path) => {
    const config = getContext('schema_config');
    return pathGet(config, path);
}

export const schemaPathGet = (path) => {
    return configPathGet(`schema.${path}`);
};

export const getChildrenByKind = (kind) => {
    const items = schemaPathGet(`${kind}.children`);
    return items.map((item, index) => ({
        index, value: item, label: schemaPathGet(`${item}.name`)
    }));
};

export const schemaChildrenMapStruct = (items = []) => {
    return items.map((key, index) => {
        return {
            index, value: key, label: schemaPathGet(`${key}.name`)
        };
    });
};

export const getSchemaProperties = (items) => {
    return items.map(define => {
        if (define.ref) {
            const { options, ...extra } = configPathGet(define.ref);
            return {
                ...extra,
                options: (options || []).map(({ name, unique }, index) => {
                    return {
                        index, value: unique, label: name
                    };
                })
            };
        }
        return define;
    })
};