<script context="module">
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

    export const values = (parent, index) => {
        let result;
        if (null === parent) {
            result = dao.pathGet(["config"], get(store));
        } else {
            result = dao.pathGet(["config", parent, index], get(store));
        }
        const { values, kind } = result;
        if (!values) {
            const items = pathGet(["schema", kind, "values"]);
            result.values = items.map((item) => {
                if (!item.ref) {
                    return item;
                }
                return pathGet(item.ref) || {};
            });
        }
        return result;
    };
</script>
