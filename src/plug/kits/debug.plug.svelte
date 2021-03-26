<script>
    import { getContext } from "svelte";
    
    export let data = { message: '暂无可用的调试信息！' };
</script>

{#if getContext('DEBUG')}
    <div class="debug-plug">
        <pre>
            <code>{ JSON.stringify(data, null, '  ') }</code>
        </pre>
    </div>
{/if}

<style>
    .debug-plug {
        margin: 5px;
        padding: 10px;
        border: 1px solid #dfdfdf;
        border-radius: 5px;
    }
    .debug-plug pre {
        margin: 0;
    }
</style>