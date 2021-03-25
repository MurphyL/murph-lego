<script>
    const { unique, children, name, resolver } = $$props;
    const { key = '$$item', value = '$$index' } = resolver;
    const options = [];
    if (Array.isArray(children)) {
        children.forEach((item, index) => {
            options.push({
                index,
                key: (key === '$$item') ? item : item[key],
                val: (value === '$$index') ? index : item[value]
            });
        });
    } else {
        Object.keys(children).forEach((item, index) => {
            options.push({
                index,
                key: item,
                val: children[key]
            });
        });
    }
</script>

<label for={unique}>{name || "未命名组件"}</label>
<select id={unique} class="form-item-object">
    {#each options as { key, val }, index}
        <option data-index={index} value={key}>{val}</option>
    {/each}
</select>
