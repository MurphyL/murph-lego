<script context="module">
    import startCase from 'lodash/startCase';
    import GroupLayout from "../children/layout.v1.child.plug.svelte";
    import ToolbarLayout from "../children/toolbar.child.plug.svelte";
    import FormLayout from "../children/form.child.plug.svelte";
    import RootLayout from "../children/root.child.plug.svelte";

    import FormItem from "../../form/form-item.plug.svelte";

    const components = {
        layout: GroupLayout,
        toolbar: ToolbarLayout,
        form: FormLayout,
        root: RootLayout,
    };
</script>

<script>
    import * as store from "../editor.store.plug.svelte";
    import ConfigEditor from "./config.editor.plug.svelte";
import { noop } from 'svelte/internal';

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
        switch (event) {
            case "view-item":
                break;
            case "update-item":
                break;
            case "add-item":
                break;
            case "remove":
                store.configRemoveChild(parent, index);
                break;
            case "update":
                break;
            case "add":
                store.configAddChild(parent, moduleState);
                break;
            case "json":
                if(parent) {
                    console.log(store.pathGet(['config', parent, index], {}));
                } else {
                    console.log(store.pathGet('config', {}));
                }
                break;
            default:
                break;
        }
        noop();
    };

    const getEditorConfig = () => ({
        items: store.schemaProperties(kind),
        values: config.properties,
    });
</script>

<div class="page-editor-dynamic-module" data-ts={config.ts}>
    <div class="module-header">
        <h4 class="title">{startCase(action)} - {startCase(kind)} - {config.unique}</h4>
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
            {#if action === "update-item"}
                <button on:click={() => setState("update")}>保存</button>
            {/if}
            {#if action === "add-item"}
                <button on:click={() => setState("add")}>保存</button>
            {/if}
        </div>
    </div>
    <div class="module-body">
        {#if action === "view-item"}
            <svelte:component this={components[kind]} {config} />
        {:else if action === "update-item" || action === "add-item"}
            <ConfigEditor bind:values={moduleState.properties} config={getEditorConfig()}>
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
        user-select: none;
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
