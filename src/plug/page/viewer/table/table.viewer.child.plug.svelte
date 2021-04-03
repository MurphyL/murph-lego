<script>
    import pathGet from 'lodash/get';
    import { ajax } from '../../../kits/ajax.plug.svelte';

    export let config = {};
    
    export let query = {};

    const { children } = config;

    const url = pathGet(query, 'config.datasource.value');
</script>

<div class="lego-item-viewer lego-table-viewer">
    {#if query.config.datasource.value}
        {#await ajax({ method: 'post', url, data: query.data }).then(res => { return res;})}
            <p>数据加载中...</p>
        {:then {rows}}
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        {#each children as { label, unique }, ci}
                            <th data-cell-index={ci} data-cell-unique={unique}>{label || "无标题"}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each rows as row, ri}
                        <tr data-row-index={ri}>
                            <td>{ri}</td>
                            {#each children as {unique}, ci}
                                <td data-cell-index={ci} data-cell-unique={unique}>{ row[unique] }</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        {:catch error}
            <p>数据加载出错：{error.message}</p>
        {/await}
    {/if}
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
    .lego-table-viewer table tbody td {
        text-align: center;
    }
</style>
