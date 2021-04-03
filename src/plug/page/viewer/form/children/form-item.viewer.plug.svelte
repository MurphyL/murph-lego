<script>
    import shortid from "shortid";

    import { resolveProperties } from "../../../_base/kits/config.kits.plug.svelte";

    export let config = {};

    const { unique, label, properties } = config;

    const identity = unique || shortid.generate();
    const name = label || "未命名字段";

    const { kind:kindConfig } = resolveProperties(properties);

    const { value:kind } = kindConfig;
</script>

<div class="form-item-plug">
    <label for={identity}>{name}</label>
    <div class="form-item-object">
        {#if kind === "select"}
            <select id={identity}>
                {#each (kindConfig.children || []) as {unique, label}, index }
                    <option data-index={`${identity}-${index}`} value={unique}>
                        <span>{label || '未命名标签'}</span>
                    </option>
                {/each}
            </select>
        {:else if kind === "date"}
            <input id={identity} type={kind} autocomplete="off" />
        {:else}
            <input id={identity} type={kind} autocomplete="off" />
        {/if}
    </div>

</div>

<style>
    .form-item-plug {
        display: flex;
        line-height: 2rem;
    }
    .form-item-plug label {
        width: 25%;
    }
    .form-item-plug label::after {
        content: "：";
    }
    .form-item-plug :global(.form-item-object) {
        flex: 1;
    }
    .form-item-plug :global(select),
    .form-item-plug :global(input) {
        width: calc(100% - 10px - 5px);
        
        font-size: 12px;
    }
    .form-item-plug :global(input[type='checkbox']),
    .form-item-plug :global(input[type='radio']) {
        width: 16px;
        height: 16px;
        vertical-align: text-bottom;
    }
</style>
