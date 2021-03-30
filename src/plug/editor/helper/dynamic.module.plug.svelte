<script context="module">
    import ChildLayout from "../children/layout.v1.child.plug.svelte";
    import ChildToolbar from "../children/toolbar.child.plug.svelte";
    import ChildForm from "../children/form.child.plug.svelte";

    const components = {
        layout: ChildLayout,
        toolbar: ChildToolbar,
        form: ChildForm,
    };
</script>

<script>
    export let kind = "layout";
    export let parent = null;
</script>

<svelte:component this={components[kind]} {parent} on:moduleOperation />
