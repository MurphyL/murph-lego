<script>
    import { onMount } from 'svelte';
    export let value;
    const { unique, children, name, defaultValue } = $$props;
    onMount(() => {
		value = defaultValue || children[0].value;
	});
</script>

<label for={unique}>{name || "未命名组件"}</label>
<select id={unique} class="form-item-object" bind:value>
    {#each children as { label, value }, index}
        <option data-index={index} value={value}>{label}</option>
    {/each}
</select>
