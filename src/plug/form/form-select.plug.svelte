<script>
    import { onMount } from 'svelte';
    export let value;
    const { unique, options, name, defaultValue } = $$props;
    onMount(() => {
		value = defaultValue || options[0].value;
	});
</script>

<label for={unique}>{name || "未命名组件"}</label>
<select id={unique} class="form-item-object" bind:value>
    {#each options as { label, value }, index}
        <option data-index={index} value={value}>{label}</option>
    {/each}
</select>
