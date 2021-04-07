<script context="module">
    import Bridge from './bridge.mark.plug.svelte';
</script>

<script>
    export let config = {};
    export let layouts = {};

    const bindClass = (key) => (layouts[key] && layouts[key].type) || 'default';
</script>


{#each Object.keys(config) as key}
    <div class="lego-mark-group {bindClass(key)}">
        {#each (config[key] || []) as mark, index }
            <Bridge {index} config={mark} group={key} />
        {/each}
    </div>
{/each}

<style>
    .lego-mark-group.horizontal {
        display: flex;
    }
</style>