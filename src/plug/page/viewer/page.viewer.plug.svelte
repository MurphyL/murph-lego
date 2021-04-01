<script>
    import { title } from '../../kits/lego.plug.svelte';
    
    import Form from './form/form.viewer.child.plug.svelte';
    import Table from './table/table.viewer.child.plug.svelte';
    import Toolbar from './toolbar/toolbar.viewer.child.plug.svelte';
    
    export let config = {};

    const components = {
        form: Form,
        toolbar: Toolbar,
        table: Table,
    };
</script>

<svelte:head>
    <title>{title(config.title)}</title>
</svelte:head>

<main class="lego-page-viewer">
    {#each (config.children || []) as item}
        <svelte:component this={components[item.kind]} config={item}/>
    {/each}
</main>

<style>
    .lego-page-viewer {
        margin: 5px;
    }
    .lego-page-viewer :global(.lego-item-viewer)  {
        margin-bottom: 10px;
        padding: 5px;
    }
</style>