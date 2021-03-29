<script>
    import { onMount } from "svelte";
    
    import { store } from './editor.store.plug.svelte';

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
        {#each ($store.children || []) as item, index}
            <ChildItem {...item} index={index} />
        {/each}
    </ChildItem>
</div>
