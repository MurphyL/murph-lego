<script>
    import * as store from "./editor.store.plug.svelte";

    import DynamicModule from "./helper/dynamic.module.plug.svelte";

    export let schema = {};
    store.init(schema);
</script>

<div class="page-editor-root">
    <DynamicModule kind="root" />
</div>

<style>
    .page-editor-root :global(.page-editor-child) {
        position: relative;
        margin: 5px;
        padding: 5px;
        min-height: 80px;
        border: 1px solid #dfdfdf;
        border-radius: 5px;
    }
</style>
