<script>
    import { createEventDispatcher } from 'svelte';

    import groupBy from "lodash/groupBy";

    export let config = {};

    const { children } = config;

    const { left, right } = groupBy(children, ({ place }) => place || "left");

    const dispatch = createEventDispatcher();

    const bindEvent = (kind) => {
        if(kind) {
            dispatch("legoEvent", { unique: kind });
        } else {
            console.log('Greeting, there!');
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
