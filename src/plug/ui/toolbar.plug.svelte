<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { router } from "tinro";

    import Button from "./ui/button.plug.svelte";

    const dispatch = createEventDispatcher();

    const { config } = $$props;
    const { children } = config;
    const left = [];
    const right = [];
    for (let item of children) {
        if (item.place === "right") {
            right.push(item);
        } else {
            left.push(item);
        }
    }

    const execute = (e) => {
        e.stopPropagation();
        const { kind, bind } = e.detail;
        switch (kind) {
            case "link":
                return router.goto(bind);
            default:
                dispatch("dte", { action: bind });
        }
    };
</script>

<div class="toolbar-plug container">
    <div class="toolbar-button-group toolbar-button-group-left">
        {#each left as { kind, bind, name }}
            <Button {kind} {bind} label={name} on:click={execute} />
        {/each}
    </div>
    {#if right.length}
        <div class="toolbar-button-group toolbar-button-group-right">
            {#each right as { kind, bind, name }}
                <Button {kind} {bind} label={name} on:click={execute} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .toolbar-plug {
        display: flex;
        padding: 0;
    }
    .toolbar-plug .toolbar-button-group {
        flex: 1;
    }
    .toolbar-plug .toolbar-button-group-right {
        text-align: right;
    }
</style>
