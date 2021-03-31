<script>
    
    import Form, { FormItem } from "../../form/form.plug.svelte";

    export let config = {
        properties: []
    };

    export let values = {};
</script>

<div class="config-properties">
    <Form>
        <slot name="before" />
        {#each config.properties as item}
            <FormItem {...item} bind:value={values[item.unique]}/>
        {/each}
        <slot name="after" />
    </Form>
</div>
