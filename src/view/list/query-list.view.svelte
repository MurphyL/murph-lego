<script>
    import shortid from "shortid";

    import Layout from "../../layout/default.layout.svelte";

    import Ajax from "../../plug/ajax.plug.svelte";

    import Form from "../../plug/form.plug.svelte";
    import Toolbar from "../../plug/toolbar.plug.svelte";

    import DataTable from "../../plug/data-table.plug.svelte";

    const { title, form, toolbar, table } = $$props.config || {};

    const events = {
        empty: console.log,
        "form-search": () => {
            table.ajax.uuid = shortid.generate();
        },
        "form-reset": console.log,
        "form-advance-search": console.log,
        "page-config": console.log,
        "form-export": console.log,
    };
    const bindEvent = (e) => {
        console.log(e);
        events[e.detail.action || "empty"]();
    };
</script>

<Layout unique="query-list" {title}>
    <Form config={form} />
    {#if toolbar}
        <Toolbar config={toolbar} on:dte={bindEvent} />
    {/if}
    {#if table}
        <Ajax {...table.ajax} let:result={rows}>
            <DataTable config={table} {rows} />
        </Ajax>
    {/if}
</Layout>
