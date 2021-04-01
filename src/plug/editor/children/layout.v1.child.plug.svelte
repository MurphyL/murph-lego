<script>

    export let config = {};

</script>

<div class="page-editor-child-module">
    {#each config.children || [] as { kind, parent }, index}
        <diiv>{index} - {kind} - {parent}</diiv>
    {/each}
</div>

