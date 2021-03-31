<script>
    import { getContext } from "svelte";

    export let title = "未命名调试数据";
    export let data = { message: "暂无可用的调试信息！" };
</script>

{#if getContext("DEBUG")}
    <fieldset class="debug-plug">
        <legend><b>{title}</b></legend>
        <pre>
            <code>{ JSON.stringify(data, null, '  ') }</code>
        </pre>
    </fieldset>
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
    .debug-plug pre {
        margin: 0;
    }
</style>
