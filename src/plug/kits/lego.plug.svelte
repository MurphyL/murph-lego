<script context="module">
    import { get as read, writable } from "svelte/store";

    import { ajax } from "./ajax.plug.svelte";
    import * as dao from "../kits/dao.v1.plug.svelte";

    const store = writable(_APP_ENV || {});

    const env = (unique) => {
        return dao.pathGet(unique, read(store));
    };

    ajax({ url: env("META_URL") }).then((res) => {
        store.update((state) => {
            return Object.assign(state, {
                ...res,
                statue: true,
            });
        });
    });

    export const title = (name) => {
        return  `${name || '未命名页面'} | ${env("APP_TITLE")}`;
    };
</script>
