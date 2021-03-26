<script>
    import { onMount } from "svelte";
    
    import store from "../../plug/editor/editor.store";

    import ChildItem from "./child.item.plug.svelte";

    const { config } = $$props;
    const { kind, unique } = config;

    onMount(() => {
        store.update((state) => {
            return Object.assign(state, {
                kind,
                unique,
            });
        });
    });
</script>

<div class="editor-root-layout">
    <ChildItem path={null} {unique} {kind}>
        {#each ($store.children || []) as item}
            <ChildItem {...item} />
        {/each}
    </ChildItem>
</div>
