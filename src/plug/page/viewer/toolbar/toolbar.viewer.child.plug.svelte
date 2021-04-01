<script>
    import groupBy from "lodash/groupBy";
    import { alert } from "lodash/_freeGlobal";

    export let config = {};

    const { children, properties } = config;

    const { left, right } = groupBy(children, ({ place }) => place || "left");

    const bindEvent = (kind) => {
        switch (kind) {
            case "query":
                alert("query");
                break;
            default:
                console.log("未配置表单自定义事件");
        }
    };
</script>

<div class="lego-item-viewer lego-toolbar-viewer">
    <div class="left-group">
        {#if (left || []).length}
            {#each left || [] as { label, bind }}
                <button on:click={() => bindEvent(bind)}>
                    <span>{label || "未命名按钮"}</span>
                </button>
            {/each}
        {:else}
            <button on:click={bindEvent}>Greeting!</button>
        {/if}
    </div>
    <div class="right-group">
        {#if (right || []).length}
            {#each right || [] as { label, bind }}
                <button on:click={() => bindEvent(bind)}>
                    <span>{label || "未命名按钮"}</span>
                </button>
            {/each}
        {:else}
            <button on:click={bindEvent}>Greeting!</button>
        {/if}
    </div>
</div>

<style>
    .lego-toolbar-viewer {
        display: flex;
        border: var(--border-size) solid var(--border-color);
        border-radius: var(--border-radius);
    }
    .lego-toolbar-viewer .left-group {
        flex: 1;
    }
    .lego-toolbar-viewer .right-group {
        flex: 1;
        text-align: right;
    }
    .lego-toolbar-viewer :global(button) {
        margin: 3px;
    }
</style>
