<script>
    import { setContext } from "svelte";

    import store from '../plug/editor/editor.store';

    import Ajax from "../plug/kits/ajax.plug.svelte";
    import Debug from "../plug/kits/debug.plug.svelte";

    import RootComponent from "../plug/editor/root.layout.plug.svelte";

    export let schema = { error: true };

    setContext("schema_config", schema);

</script>

<svelte:head>
    <title>表单编辑器</title>
</svelte:head>

{#if schema.error}
    <div>加载配置错误</div>
{:else}
    <main class="page-editor-view">
        <Ajax url="/build/editor.json" let:result>
            <RootComponent config={ result } />
            <Debug data={$store} title="配置信息" />
        </Ajax>
    </main>
{/if}
