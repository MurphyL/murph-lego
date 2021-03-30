<script>
    import { createEventDispatcher } from "svelte";

    export let parent = null;
    export let index = 0;

    const dispatch = createEventDispatcher();

    const postEvent = (action) => {
        dispatch("moduleOperation", {
            action,
            parent,
            index,
        });
    };
</script>

<div class="page-editor-moduler-toolbar">
    <button on:click={() => postEvent("config-item")}>设置组件</button>
    <button on:click={() => postEvent("add-item")}>添加组件</button>
    {#if parent}
        <button on:click={() => postEvent("remove-item")}>删除组件</button>
    {/if}
</div>

<style>
    .page-editor-moduler-toolbar {
        position: absolute;
        top: 8px;
        right: 8px;
        visibility: hidden;
    }
</style>
