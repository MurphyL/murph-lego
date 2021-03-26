<script>
    import FormItem from "./form-item.plug.svelte";
    const { config } = $$props;
</script>

<form class="form-plug container">
    <ul class="form-item-plug-list">
        {#each config.children as item, index}
            <FormItem {index} {...item} />
        {/each}
    </ul>
</form>

<style>
    .form-plug {
        padding: 20px;
        border: 1px solid #efefef;
    }
    .form-plug .form-item-plug-list {
        margin: 0;
        padding: 0;
    }
</style>
