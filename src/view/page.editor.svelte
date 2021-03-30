<script>
    import Ajax from "../plug/kits/ajax.plug.svelte";
    import PageEditor from "../plug/editor/editor.root.plug.svelte";
</script>

<svelte:head>
    <title>表单编辑器</title>
</svelte:head>


<main class="page-editor">
    <Ajax url="/build/schema.json" let:result>
        <PageEditor schema={result} />
    </Ajax>
</main>