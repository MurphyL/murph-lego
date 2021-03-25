<script>
    const { unique, children, name } = $$props;
</script>

<label for={unique}>{name || "未命名组件"}</label>
<select id={unique} class="form-item-object">
    {#each children as { label, value }, index}
        <option data-index={index} value={value}>{label}</option>
    {/each}
</select>
