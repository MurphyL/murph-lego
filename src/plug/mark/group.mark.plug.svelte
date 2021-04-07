<script context="module">
    import Bridge from './bridge.mark.plug.svelte';
</script>

<script>
    export let config = {};
</script>


{#each Object.keys(config) as key}
    <div class="lego-mark-group">
        {#each (config[key] || []) as mark, index }
            <Bridge {index} config={mark} group={key} />
        {/each}
    </div>
{/each}
