<script>
    import DynamicModule from "../helper/dynamic.module.plug.svelte";

    export let config = {};

    console.log(config);
</script>

<div class="page-editor-child-module">
    {#each config.children || [] as { kind, parent }, index}
        <DynamicModule {index} {kind} {parent} />
    {/each}
</div>

<style>
</style>
