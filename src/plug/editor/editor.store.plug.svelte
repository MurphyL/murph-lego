<script context="module">
    import { get, writable } from "svelte/store";

    import { pathGet, pathArrayPush, pathObjectAssign, pathArrayRemoveIndex } from "../kits/dao.plug.svelte";

    export const store = writable({});

    export const storePathArrayPush = (path, value) => {
        return store.update((state) => pathArrayPush(state, path, value));
    };

    export const storePathObjectAssign = (path, value) => {
        return store.update((state) => pathObjectAssign(state, path, value));
    };

    export const storePathGet = (path, defaultValue) => {
        return pathGet(get(store), path, defaultValue);
    };

    export const storePathArrayRemove = (path, index) => {
        return store.update((state) => pathArrayRemoveIndex(state, path, index));
    };

</script>
