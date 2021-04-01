<script>
    
    import Form, { FormItem } from "../../form/form.plug.svelte";

    export let config = {};

    const { items } = config;
</script>

<div class="config-properties">
    <Form>
        <slot name="before" />
        {#each items as item}
            <FormItem {...item} bind:value={item.defaultValue}/>
        {/each}
        <slot name="after" />
    </Form>
</div>
