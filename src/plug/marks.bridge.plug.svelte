<script context="module">
    import Table from '../plug/mark/table.mark.plug.svelte';
</script>

<script>
    export let index = 0;
    export let config = {};
</script>

<div class="data-marks-{index}">
    {#if config.type === 'image'}
        <img src={config.url} alt="" />
    {:else if config.type === 'table'}
        <Table {config} />
    {:else}
        <pre>
            <code>{JSON.stringify(config, null, '  ')}</code>
        </pre>
    {/if}
</div>