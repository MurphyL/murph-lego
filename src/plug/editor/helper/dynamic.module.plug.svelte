<script context="module">
    import ChildLayout from "../children/layout.v1.child.plug.svelte";
    import ChildToolbar from "../children/toolbar.child.plug.svelte";
    import ChildForm from "../children/form.child.plug.svelte";

    import FormItem from "../../form/form-item.plug.svelte";

    const components = {
        layout: ChildLayout,
        toolbar: ChildToolbar,
        form: ChildForm,
    };
</script>

<script>
    import * as store from "../editor.store.plug.svelte";
    import ConfigEditor from "./config.editor.plug.svelte";

    export let kind = "layout";
    export let index = 0;
    export let parent = null;

    let action = "view-item";

    const config = store.configPathGet(parent, index);

    let moduleState = {};

    const setState = (event) => {
        if (/item$/.test(event)) {
            action = event;
        }
        const { kind, properties } = moduleState;
        switch (event) {
            case "view-item":
                break;
            case "update-item":
                break;
            case "add-item":
                break;
            case "save":
                store.addChild(parent, kind, properties);
                break;
            case "json":
                break;
            default:
                break;
        }
    };
</script>

<div class="page-editor-dynamic-module">
    <div class="module-header">
        <h4 class="title">{action} - {kind} - {config.unique}</h4>
        <div class="tabs">
            <button on:click={() => setState("view-item")}>查看组件</button>
            <button on:click={() => setState("update-item")}>设置组件</button>
            <button on:click={() => setState("add-item")}>添加组件</button>
            {#if parent}
                <button on:click={() => setState("remove")}>删除组件</button>
            {/if}
        </div>
        <div class="operations">
            {#if action === "view-item"}
                <button on:click={() => setState("json")}>查看JSON</button>
            {/if}
            {#if action === "update-item" || action === "add-item"}
                <button on:click={() => setState("save")}>保存</button>
            {/if}
        </div>
    </div>
    <div class="module-body">
        {#if action === "view-item"}
            <svelte:component this={components[kind]} {config} />
        {:else if action === "update-item" || action === "add-item"}
            <ConfigEditor {config} bind:values={moduleState.properties}>
                <svelte:fragment slot="before">
                    {#if action === "add-item"}
                        <FormItem
                            name="组件类型"
                            kind="select"
                            options={store.schemaChildren(kind)}
                            bind:value={moduleState.kind}
                        />
                    {/if}
                </svelte:fragment>
            </ConfigEditor>
        {/if}
    </div>
</div>

<style>
    .page-editor-dynamic-module {
        margin: 5px;
        border: 1px solid var(--border-color);
        border-radius: 3px;
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
    .page-editor-dynamic-module .tabs {
        text-align: center;
    }
    .page-editor-dynamic-module .operations {
        text-align: right;
    }
    .page-editor-dynamic-module .title,
    .page-editor-dynamic-module .tabs,
    .page-editor-dynamic-module .operations {
        flex: 1;
    }
    .page-editor-dynamic-module:hover .tabs {
        visibility: visible;
    }
    .page-editor-dynamic-module .tabs button {
        margin: 0;
    }
    .page-editor-dynamic-module .module-body {
        padding: 10px;
        min-height: 230px;
    }
    .page-editor-dynamic-module .module-body :global(pre) {
        margin: 0;
    }
</style>
