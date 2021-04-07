<script context="module">
    import group from "lodash/groupBy";
    import { ajax } from "../plug/kits/ajax.plug.svelte";
    import { extract } from "../plug/kits/schema.plug.svelte";

    import Root from "../plug/mark/root.mark.plug.svelte";

    const fetch = (unique) => {
        return Promise.all([
            ajax({ url: "/build/schema/vega-lite.v2.json" }),
            ajax({ url: `/build/target/v1/${unique}.json` }),
        ]).then(extract);
    };

    const build = (marks) => {
        return group(marks, ({ layout }) => layout || "default");
    };
</script>

<script>
    export let unique = "hello";

    const reslove = ({ marks, layouts }) => {
        return {
            layouts,
            config: build(marks),
        };
    };
</script>

<svelte:head>
    <title>自定义图表 - Vega Lite V2</title>
</svelte:head>

{#await fetch(unique)}
    <div>数据加载中……</div>
{:then result}
    <main class="lego-visualizer-v1">
        <h3>{result["title"] || "未命名图表"}</h3>
        <Root {...reslove(result)} />
    </main>
{:catch error}
    <div>数据加载错误 - {error.message}</div>
{/await}
