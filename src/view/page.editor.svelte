<script>
    import { setContext } from 'svelte';
    import Layout from "../plug/layout.plug.svelte";

    export let schema = { error: true };

    setContext('schema', schema);
</script>

{#if schema.error}
    <div>加载配置错误</div>
{:else}
    <main class="page-editor-view">
        <div class="page-editor-board">
            <Layout {...schema.layout} />
        </div>
    </main>
{/if}
