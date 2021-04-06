<script>
    import { Route } from "tinro";

    import Visualizer from "../view/visualizer.v1.svelte";
</script>

<Route>
    <Route path="/lego/v1/:unique" let:meta>
        <Visualizer unique={meta.params.unique} />
    </Route>
    <Route fallback>
        <div>404</div>
    </Route>
</Route>
