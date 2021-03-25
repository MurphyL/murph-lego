<script>
    import { createEventDispatcher } from 'svelte';
    export let kind = "event";
    export let bind = "empty";
    export let label = "按钮";
    const dispatch = createEventDispatcher();
    const trigger = (e) => {
        e.stopPropagation(); 
        dispatch('click', { kind, bind });
    };
</script>

<button data-kind={kind} data-bind={bind} on:click={trigger}>
    <span>{label}</span>
</button>

<style>
    button {
        margin: 2px 3px;
        padding: 0 15px;
        line-height: 30px;
    }
</style>