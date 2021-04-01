<script>
    
    import Form, { FormItem } from "../../form/form.plug.svelte";

    export let config = {};

    const { items, values } = config;

    // export let values = {};
</script>

<div class="config-properties">
    <Form>
        <slot name="before" />
        {#each items as item}
            <FormItem {...item} bind:value={values[item.unique]}/>
        {/each}
        <slot name="after" />
    </Form>
</div>
