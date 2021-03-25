<script>
    
    import Children from './children.plug.svelte';

    

    const { name, children, view = 'preview' } = $$props;
</script>

<div class="layout-plug" data-name={name}>
    <Children key="layout" />
</div>

<style>
    .layout-plug {
        position: relative;
        margin: 5px;
        padding: 5px;
        min-height: 80px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .layout-plug:hover {
        border: 1px solid #888;
    }
    .layout-plug::before {
        position: absolute;
        top: 10px;
        left: 10px;
        content: attr(data-name);
        font-size: 18px;
        color: #888;
        opacity: 0.5;
    }
    .layout-plug:hover::before {
        opacity: 1;
    }
    .layout-plug:hover :global(.child-editor-plug .editor-toobar) {
        visibility: visible;
    }
</style>