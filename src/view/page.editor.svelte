<script>
    import { setContext } from 'svelte';
    import LayoutEditor from "../plug/editor/layout-editor.plug.svelte";

    export let config = { error: true };
    
    setContext('schema_config', config);
</script>

<svelte:head>
    <title>表单编辑器</title>
</svelte:head>

{#if config.error}
    <div>加载配置错误</div>
{:else}
    <main class="page-editor-view">
        <LayoutEditor root={true} {...config.schema.layout} />
    </main>
{/if}
