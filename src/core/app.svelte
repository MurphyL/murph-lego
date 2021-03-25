<script>
    import { setContext } from "svelte";
    import { Route } from "tinro";

    import Ajax from "../plug/ajax.plug.svelte";

    import PageEditor from "../view/page.editor.svelte";

    export let APP_ENV = {};

    setContext("APP_CONTEXT", APP_ENV);
</script>

<Route>
    <Route path="/editor">
        <Ajax url="build/schema.json" let:result={schema} debug={true}>
            <PageEditor {schema} />
        </Ajax>
    </Route>
    <Route fallback>
        <ul>
            <li>
                <a href="/editor">Editor</a>
            </li>
            <li>
                <a href="/viewer">Viewer</a>
            </li>
        </ul>
    </Route>
</Route>
