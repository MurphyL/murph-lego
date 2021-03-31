<script>

    export let action;
    export let config = {};
</script>

<div class="page-editor-child-module">
    {#if action === 'view-item'}
        <pre>
            <code>{JSON.stringify(config, null, '  ')}</code>
        </pre>
    {/if}
</div>

<style>
</style>
