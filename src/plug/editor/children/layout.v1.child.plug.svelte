<script>
    import ModuleToolbar from "../helper/sub-module.toolbar.plug.svelte";

    export let index = 0;
    export let parent = null;

    console.log(parent, index);
</script>

<div class="page-editor-child page-editor-child-layout">
    <div>Layout</div>
    <ModuleToolbar {index} {parent} on:moduleOperation />
</div>

<style>
</style>
