<script>
    import { setContext } from "svelte";

    import { store, storePathObjectAssign } from "../plug/editor/editor.store.plug.svelte";

    import Ajax from "../plug/kits/ajax.plug.svelte";
    import Debug from "../plug/kits/debug.plug.svelte";

    import RootComponent from "../plug/editor/root.layout.plug.svelte";

    export let schema = { error: true };

    setContext("schema_config", schema);

    const mergeStore = (extra) => {
        const { kind, unique } = extra;
        storePathObjectAssign(null, 0, {
            kind,
            unique,
        });
        return extra;
    };
</script>

<svelte:head>
    <title>表单编辑器</title>
</svelte:head>

{#if schema.error}
    <div>加载配置错误</div>
{:else}
    <Ajax url="/build/editor.json" let:result>
        <RootComponent config={mergeStore(result)} />
        <Debug data={$store} title="配置信息" />
    </Ajax>
{/if}
