<script>
    export let unique = "default";
    // horizontal and vertical
    export let title = '未命名页面';
</script>

<svelte:head>
    <title>{ title } - 配置页面</title>
</svelte:head>

<main class="layout" data-view={unique}>
    <slot layout="default" />
</main>
