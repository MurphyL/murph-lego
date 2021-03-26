<script>
    import shortid from "shortid";
    import FormInput from "./form-input.plug.svelte";
    import FormSelect from "./form-select.plug.svelte";
    export let value = null;
    const unique = `form-item-${shortid.generate()}`;
    const { kind = 'text', name, index, ...extra } = $$props;
</script>

<li class="form-item-plug" data-item-index={index}>
    {#if kind === "select"}
        <FormSelect {unique} {name} {...extra} bind:value />
    {:else}
        <FormInput {unique} {name} type={kind} {...extra} bind:value />
    {/if}
</li>

<style>
    .form-item-plug,
    .form-item-plug :global(label) {
        display: inline-block;
    }
    .form-item-plug {
        position: relative;
        margin: 0;
        padding: 0;
        width: calc((100% - 2 * 10px) / var(--form-item-cell));
        line-height: 30px;
        vertical-align: middle;
    }
    .form-item-plug :global(label) {
        width: 25%;
        text-align: right;
    }
    .form-item-plug :global(label)::after {
        content: "：";
    }
    .form-item-plug :global(.form-item-object) {
        margin: 0;
        padding: 2px 3px;
        outline: none;
        background: none;
        border: 1px solid #d1d1d1;
        /* appearance: unset; */
        border-radius: 2px;
        box-shadow: none;
        box-sizing: border-box;
        font-family: inherit;
    }
    .form-item-plug :global(select),
    .form-item-plug :global(input) {
        width: 60%;
    }
    .form-item-plug :global(input[type='checkbox']),
    .form-item-plug :global(input[type='radio']) {
        width: 16px;
        height: 16px;
        vertical-align: text-bottom;
    }

</style>
