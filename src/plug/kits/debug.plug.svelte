<script>
    import { getContext } from "svelte";

    export let title = "未命名调试数据";
    export let data = { message: "暂无可用的调试信息！" };
</script>

{#if getContext("DEBUG")}
    <div class="debug-plug">
        <h4>{title}</h4>
        <pre>
            <code>{ JSON.stringify(data, null, '  ') }</code>
        </pre>
    </div>
{/if}

<style>
    .debug-plug {
        position: relative;
        margin: 5px;
        padding: 5px;
        border: 1px solid #dfdfdf;
        border-radius: 5px;
    }
    .debug-plug::after {
        position: absolute;
        right: 10px;
        top: 5px;
        color: #ccc;
        content: 'DEBUG';
    }
    .debug-plug h4 {
        margin: 5px 0 10px;
    }
    .debug-plug pre {
        margin: 0;
    }
</style>
