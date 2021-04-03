<script>
    import { ajax } from '../../../kits/ajax.plug.svelte';

    export let config = {};
    
    export let query = {};

    const { children } = config;

</script>

<div class="lego-item-viewer lego-table-viewer">
    <table>
        <thead>
            <tr>
                <th></th>
                {#each children as { label, unique }, ci}
                    <th data-cell-unique={unique}>{label || "无标题"}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#if query.config.datasource.value}
            {#await ajax({ url: query.config.datasource.value })}
                <!-- promise is pending -->
                <p>waiting for the promise to resolve...</p>
            {:then {rows}}
                <!-- promise was fulfilled -->
                {#each rows as row, ri}
                    <tr data-row-index={ri}>
                        <td>{ri}</td>
                        {#each children as {unique}, ci}
                            <td data-cell-index={ci} data-cell-unique={unique}>{ row[unique] }</td>
                        {/each}
                    </tr>
                {/each}
            {:catch error}
                <!-- promise was rejected -->
                <p>Something went wrong: {error.message}</p>
            {/await}
            {/if}
        </tbody>
    </table>
</div>

<style>
    .lego-table-viewer {
        min-height: 200px;

        border: var(--border-size) solid var(--border-color);
        border-radius: var(--border-radius);
    }
    .lego-table-viewer table {
        width: 100%;
    }
</style>
