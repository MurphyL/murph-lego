<script>
    
    import Form, { FormItem } from "../../form/form.plug.svelte";
    import DebugView from '../../kits/debug.plug.svelte';

    export let config = {
        properties: []
    };

    const values = {};
</script>

<div class="config-properties">
    <Form>
        {#each config.properties as item}
            <FormItem {...item} bind:value={values[item.unique]}/>
        {/each}
    </Form>
    <DebugView data={values} title="组件数据" />
</div>
