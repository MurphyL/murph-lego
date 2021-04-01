<script>
    import Ajax from "../plug/kits/ajax.plug.svelte";
    import PageViewer from "../plug/page/viewer/page.viewer.plug.svelte";

    export let unique = 'hello_world';
</script>

<Ajax url={`/build/${unique}.json`} let:result>
    <PageViewer config={result} />
</Ajax>