<script>
    const { config } = $$props;
</script>

<table class="data-table-plug container">
    <thead>
        <tr>
            {#each config.columns as column, index}
                <th data-column-index={index}>{column.name || column.unique || index}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each config.children as item, ri}
            <tr data-row-index={ri}>
                {#each config.columns as column, ci}
                    <td data-column-index={ci}>{item[column.unique] || (ri + 1)}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .data-table-plug {
        width: calc(100% - 10px * 2);
        border-spacing: 0;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
    }
    .data-table-plug :global(th) {
        border-top: 1px solid #ccc;
        border-bottom: 1.5px solid #ccc;
        line-height: 30px;
        text-align: left;
    }
    .data-table-plug :global(td) {
        line-height: 30px;
        border-bottom: 1px solid #ccc;
    }
    .data-table-plug :global(th),
    .data-table-plug :global(td) {
        padding: 6px 10px;
    }
</style>
