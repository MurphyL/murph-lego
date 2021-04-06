<script context="module">
    import { ajax } from "../plug/kits/ajax.plug.svelte";
    import * as resolver from "../plug/kits/schema.plug.svelte";

    import Mark from '../plug/marks.bridge.plug.svelte';

    const fetch = (unique) => {
        return Promise.all([
            ajax({ url: "/build/schema/vega-lite.v2.json" }),
            ajax({ url: `/build/target/v1/${unique}.json` }),
        ]);
    };
</script>

<script>
    export let unique = "hello";
</script>

<svelte:head>
    <title>自定义图表 - Vega Lite V2</title>
</svelte:head>

{#await fetch(unique)}
    <div>数据加载中……</div>
{:then result}
    <main class="lego-visualizer-v1">
        <h3>{resolver.title(result) || "未命名图表"}</h3>
        {#each resolver.marks(result) as item, index}
            <Mark config={item} {index} />
        {/each}
    </main>
{:catch error}
    <div>数据加载错误 - {error.message}</div>
{/await}
