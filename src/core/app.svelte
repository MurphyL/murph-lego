<script>
    import { Route } from "tinro";

    import PageViewer from "../view/page.viewer.v1.svelte";
</script>

<Route>
    <Route path="/lego/v1/:unique" let:meta>
        <PageViewer unique={meta.params.unique} />
    </Route>
    <Route fallback>
        <div>404</div>
    </Route>
</Route>
