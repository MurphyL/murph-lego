<script>
    import * as store from "./editor.store.plug.svelte";

    import DynamicModule from "./helper/dynamic.module.plug.svelte";
    import ConfigEditor from "./helper/config.editor.plug.svelte";

    import Drawer from "../ui/drawer.plug.svelte";
    import Debug from "../kits/debug.plug.svelte";

    export let schema = {};
    store.init(schema);

    const kind = "layout";

    let drawerVisible = false;
    const drawerConfig = {};

    const postDetails = (e) => {
        e.stopPropagation();
        drawerVisible = true;
        const { action, parent, index } = e.detail;
        Object.assign(drawerConfig, e.detail);
        switch (action) {
            case "config-item":
                const properties = store.properties(parent, index);
                Object.assign(drawerConfig, properties);
                break;
            case "add-item":
                console.log("add-item");
                break;
            case "remove-item":
                console.log("remove-item");
                break;
        }
    };
</script>

<div class="page-editor-root">
    <DynamicModule {kind} on:moduleOperation={postDetails} />
    <Drawer show={drawerVisible} on:close={() => (drawerVisible = false)}>
        <ConfigEditor config={drawerConfig} />
    </Drawer>
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
    .page-editor-root :global(.drawer-plug) {
        width: 30vw;
    }
    .page-editor-root :global(.page-editor-child:hover .page-editor-moduler-toolbar) {
        visibility: visible;
    }
</style>
