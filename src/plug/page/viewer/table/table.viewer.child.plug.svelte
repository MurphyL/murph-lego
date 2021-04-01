<script>
    export let config = {};
    const { children } = config;

</script>

<div class="lego-item-viewer lego-table-viewer">
    <table>
        <thead>
            <tr>
                {#each children as { label, unique }, ci}
                    <th data-cell-unique={unique}>{label || "无标题"}</th>
                {/each}
            </tr>
        </thead>
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
