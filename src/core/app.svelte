<script>
    import { setContext } from "svelte";
    import { Route } from "tinro";

    import PageEditor from "../view/page.editor.svelte";

    export let APP_ENV = {};

    setContext("APP_CONTEXT", APP_ENV);
    if(APP_ENV.DEBUG) {
        setContext("DEBUG", true);
        console.log('调试信息：', APP_ENV);
    }
</script>

<Route>
    <Route path="/editor">
        <PageEditor />
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
