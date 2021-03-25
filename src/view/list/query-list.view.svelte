<script>
    import Layout from "../../layout/default.layout.svelte";

    import Form from "../../plug/form.plug.svelte";
    import Toolbar from "../../plug/toolbar.plug.svelte";

    import DataTable from "../../plug/data-table.plug.svelte";

    export let config;
</script>

<Layout unique="query-list" title={config.title}>
    <Form config={config.form} />
    {#if config.toolbar}
        <Toolbar config={config.toolbar} />
    {/if}
    <DataTable config={config.table} />
</Layout>
