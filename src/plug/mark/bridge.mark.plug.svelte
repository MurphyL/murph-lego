<script context="module">
    import Table from "./table.mark.plug.svelte";
</script>

<script>
    export let index = 0;
    export let config = {};
    export let group = "default";

    const { type, ...extra } = config;
</script>

<div class="data-mark" data-group-index={index} data-group={group}>
    {#if type === "image"}
        <img src={extra.url} alt="" />
    {:else if type === "table"}
        <Table config={extra} />
    {:else}
        <pre>
            <code>{JSON.stringify(config, null, '  ')}</code>
        </pre>
    {/if}
</div>

<style>
    .data-mark {
        flex: 1;
    }
</style>
