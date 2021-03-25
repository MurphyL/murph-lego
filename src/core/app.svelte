<script>
    import { setContext } from "svelte";
    import { Route } from "tinro";

    import DefaultLayout from "../layout/default.layout.svelte";
    import Ajax from "../plug/ajax.plug.svelte";

    import QueryList from "../view/list/query-list.view.svelte";

    export let APP_ENV = {};

    setContext("APP_CONTEXT", APP_ENV);
</script>

<Route>
    <Route path="/">
        <DefaultLayout>
            <div>Home</div>
        </DefaultLayout>
    </Route>
    <Route path="/test-query-list">
        <Ajax url="/mock/ui/query-list.json" let:result>
            <QueryList config={result} />
        </Ajax>
    </Route>
</Route>
