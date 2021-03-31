<script context="module">
    import shortid from 'shortid';
    import { get as read, writable } from "svelte/store";
    import * as dao from "../kits/dao.v1.plug.svelte";

    const store = writable({});

    export const init = ({ definitions, schema }) => {
        return store.set({
            schema,
            definitions,
            config: {
                kind: "layout",
                unique: "root",
                children: [],
            },
        });
    };

    export const get = () => {
        return read(store);
    };

    export const pathGet = (path, defaultValue) => {
        return dao.pathGet(path, read(store), defaultValue);
    };

    export const pathSet = (path, values) => {
        return store.update((state) => dao.pathSet(path, state, values));
    };

    export const schemaChildren = (kind) => {
        return pathGet(`schema.${kind}.children`, []).map((item, index) => ({
            index,
            value: item,
            label: pathGet(`schema.${item}.name`),
        }));
    };

    export const addChild = (parent, kind, properties) => {
        console.log(kind, properties);

        console.log(pathGet(["config", parent, "children"], []));
        return store.update((state) => {
            const children = pathGet(["config", parent, "children"], []);
            children.push({
                kind,
                unique: shortid.generate(),
                properties,
            });
        });
    };

    export const configPathGet = (parent, index) => {
        let result;
        if (null === parent) {
            result = dao.pathGet("config", get(store));
        } else {
            result = dao.pathGet(["config", parent, index], get(store));
        }
        const { properties, kind } = result;
        if (!properties) {
            const items = pathGet(["schema", kind, "properties"]);
            result.properties = items.map((item) => {
                if (!item.ref) {
                    return item;
                }
                return pathGet(item.ref) || {};
            });
        }
        return result;
    };
</script>
