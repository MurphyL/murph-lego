<script>
    import FormItem from "./children/form-item.viewer.plug.svelte";

    import { resolveProperties } from "../../_base/kits/config.kits.plug.svelte";

    export let config = {};

    const table = [];

    const { children, properties } = config;

    const { columns } = resolveProperties(properties);

    (children || []).forEach((item, index) => {
        const rn = Math.floor(index / (columns || 3));
        if (!table[rn]) {
            table[rn] = [];
        }
        table[rn].push(item);
    });

    console.log(config, table);
</script>

<form class="lego-item-viewer lego-form-viewer">
    <table>
        {#each table || [] as row, rn}
            <tr data-row={rn}>
                {#each row || [] as cell}
                    <td><FormItem config={cell} /></td>
                {/each}
            </tr>
        {/each}
    </table>
</form>

<style>
    .lego-form-viewer {
        min-height: 85px;

        border: var(--border-size) solid var(--border-color);
        border-radius: var(--border-radius);
    }
    .lego-form-viewer table {
        width: 100%;
        table-layout : fixed
    }
    .lego-form-viewer :global(.form-item-plug label) {
        text-align: right;
    }
</style>
