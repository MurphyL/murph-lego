<script>
    const {unique, name, type} = $$props;
    export let value = "";
</script>

<label for={unique}>{name || '未命名组件'}</label>
<input id={unique} class="form-item-object" type="text"  bind:value/>
