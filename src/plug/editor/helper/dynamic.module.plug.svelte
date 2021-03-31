<script context="module">
    import ChildLayout from "../children/layout.v1.child.plug.svelte";
    import ChildToolbar from "../children/toolbar.child.plug.svelte";
    import ChildForm from "../children/form.child.plug.svelte";

    const components = {
        layout: ChildLayout,
        toolbar: ChildToolbar,
        form: ChildForm,
    };
</script>

<script>
    import { values } from "../editor.store.plug.svelte";
    import ConfigEditor from "./config.editor.plug.svelte";

    export let kind = "layout";
    export let index = 0;
    export let parent = null;

    let action = "view-item";

    const config = values(parent, index);
</script>

<div class="page-editor-dynamic-module">
    <div class="module-header">
        <h4 class="title">{action} - {kind} - {config.unique}</h4>
        <div class="toolbar">
            <button on:click={() => (action = "view-item")}>查看组件</button>
            <button on:click={() => (action = "config-item")}>设置组件</button>
            <button on:click={() => (action = "add-item")}>添加组件</button>
            {#if parent}
                <button on:click={() => (action = "remove-item")}>删除组件</button>
            {/if}
        </div>
    </div>
    <div class="module-body">
        {#if action === "view-item"}
            <svelte:component this={components[kind]} {action} {config} />
        {:else if action === "config-item"}
            <ConfigEditor {config} />
        {:else}
            <div>x</div>
        {/if}
    </div>
</div>

<style>
    .page-editor-dynamic-module {
        margin: 5px;
        border: 1px solid var(--border-color);
        border-radius: 3px;;
    }
    .page-editor-dynamic-module .module-header {
        display: flex;
        padding: 5px 8px;
        line-height: 25px;
        border-bottom: 1px solid var(--border-color);
    }
    .page-editor-dynamic-module .title {
        margin: 0;
    }
    .page-editor-dynamic-module .toolbar {
        text-align: right;
    }
    .page-editor-dynamic-module .title,
    .page-editor-dynamic-module .toolbar {
        flex: 1;
    }
    .page-editor-dynamic-module:hover .toolbar {
        visibility: visible;
    }
    .page-editor-dynamic-module .module-body {
        padding: 10px;
        min-height: 230px;
    }
    .page-editor-dynamic-module .module-body :global(pre) {
        margin: 0;
    }
</style>
