<script>
    import Ajax from "../plug/kits/ajax.plug.svelte";
    import PageEditor from "../plug/editor/editor.root.plug.svelte";
</script>

<svelte:head>
    <title>页面查看器</title>
</svelte:head>

<Ajax url="/build/schema.json" let:result>
    <PageEditor schema={result} />
</Ajax>