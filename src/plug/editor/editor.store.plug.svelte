<script context="module">
    import { get, writable } from "svelte/store";

    import { pathGet, pathArrayPush, pathObjectAssign, pathArrayRemove } from "../kits/dao.plug.svelte";

    export const store = writable({});

    export const storePathArrayPush = (path, value) => {
        return store.update((state) => pathArrayPush(state, path, value));
    };

    export const storePathObjectAssign = (path, index, value) => {
        return store.update((state) => pathObjectAssign(state, path, index, value));
    };

    export const storePathGet = (path, defaultValue) => {
        return pathGet(get(store), path, defaultValue);
    };

    export const storePathArrayRemove = (path, index) => {
        return store.update((state) => pathArrayRemove(state, path, index));
    };

</script>
