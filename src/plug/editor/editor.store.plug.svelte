<script context="module">
    import shortid from "shortid";
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

    export const schemaProperties = (kind) => {
        const properties = pathGet(`schema.${kind}.properties`, []);
        return properties.map((item) => {
            if (item.ref) {
                return pathGet(item.ref, {});
            }
            return item;
        });
    };

    export const addChild = (parent, kind, properties) => {
        return store.update((state) => {
            const path = ["config", parent, "children"];
            const children = pathGet(path, []);
            children.push({
                parent: dao.makePath([parent, "children"]),
                kind: kind,
                index: children.length,
                unique: shortid.generate(),
                properties: properties,
            });
            pathSet(path, children);
            return state;
        });
    };

    export const configPathGet = (parent, index) => {
        if (null === parent) {
            return dao.pathGet("config", get(store));
        } else {
            return dao.pathGet(["config", parent, index], get(store));
        }
    };
</script>
