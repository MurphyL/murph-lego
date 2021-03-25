<script>
    export let unique;
    export let name = "未命名组件";
    export let type = "text";
</script>

<label for={unique}>{name}</label>
<input id={unique} class="form-item-object" {type} />

<style>

</style>
