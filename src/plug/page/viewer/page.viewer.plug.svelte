<script context="module">
    import trim from "lodash/trim";

    import Form from "./form/form.viewer.child.plug.svelte";
    import Toolbar from "./toolbar/toolbar.viewer.child.plug.svelte";
    import Table from "./table/table.viewer.child.plug.svelte";

    const components = {
        form: Form,
        toolbar: Toolbar,
        table: Table,
    };
</script>

<script>
    
    import { title } from "../../kits/lego.plug.svelte";
    
    import { resolveProperties } from "../_base/kits/config.kits.plug.svelte";

    export let config = {};

    let formElement;

    const events = {
        query: () => {
            if (!formElement) {
                return;
            }
            const values = {};
            Array.from(formElement.elements).forEach((item) => {
                values[trim(item.id)] = trim(item.value);
            });
            return { 
                data: values, 
                config: resolveProperties(config.properties)
            };
        },
        reset: () => {
            formElement && formElement.reset();
        },
    };

    const props = (item) => components[item.kind];

    const legoEvent = ({ detail }) => {
        switch(detail.unique) {
            case 'query':
                events.query();
                break;
            case 'reset':
                events.reset();
                break;
            default:
                console.log(detail);
                break;
        }
    };
</script>

<svelte:head>
    <title>{title(config.title)}</title>
</svelte:head>

<main class="lego-page-viewer">
    {#each config.children || [] as item}
        {#if item.kind === "form"}
            <svelte:component this={props(item)} config={item} bind:formElement />
        {:else if item.kind === "toolbar"}
            <svelte:component this={props(item)} config={item} on:legoEvent={legoEvent}/>
        {:else if formElement}
            <svelte:component this={props(item)} config={item} query={events.query()} />
        {:else}
            <div>数据加载中……</div>
        {/if}
    {/each}
</main>

<style>
    .lego-page-viewer {
        margin: 5px;
    }
    .lego-page-viewer :global(.lego-item-viewer) {
        margin-bottom: 10px;
        padding: 5px;
    }
</style>
