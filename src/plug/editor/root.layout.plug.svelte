<script>
    
    import { store } from './editor.store.plug.svelte';

    import ChildItem from "./child.item.plug.svelte";

    export let config;
    
    const { kind, unique } = config;
</script>

<div class="editor-root-layout">
    <ChildItem parent={null} {unique} {kind}>
        {#each ($store.children || []) as item, index}
            <ChildItem {...item} index={index} />
        {/each}
    </ChildItem>
</div>
