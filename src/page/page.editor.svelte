<script>
    import { setContext } from 'svelte';
    import Layout from "../plug/editor/layout-editor.plug.svelte";

    export let schema = { error: true };

    setContext('schema', schema);
</script>

<svelte:head>
	<title>表单编辑器</title>
</svelte:head>

{#if schema.error}
    <div>加载配置错误</div>
{:else}
    <main class="page-editor-view">
        <div class="page-editor-board">
            <Layout {...schema.layout} />
        </div>
    </main>
{/if}
