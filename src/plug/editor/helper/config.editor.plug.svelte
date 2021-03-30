<script>
    import FormItem from "../../form/form-item.plug.svelte";

    export let config = {};

    const title = () => {
        switch (config.action) {
            case "config-item":
                return "修改配置";
            case "add-item":
                return "新增配置";
            case "remove-item":
                return "删除配置";
        }
    };

    console.log(config);
</script>

<div class="config-editor-plug">
    <h4>{title()}</h4>
    <div class="config-properties">
        {#each config.properties as item}
            <FormItem {...item} />
        {/each}
    </div>
</div>
