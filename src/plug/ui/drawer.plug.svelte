<script>
    import { createEventDispatcher } from "svelte";
    export let show = false;
    const dispatch = createEventDispatcher();
</script>

{#if show}
    <div class="drawer-plug">
        <div class="drawer-mask" on:click={() => dispatch("close")} />
        <div class="drawer-wrapper">
            <div class="drawer-body">
                <slot />
            </div>
        </div>
    </div>
{/if}

<style>
    .drawer-plug .drawer-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.6;
        background-color: #666;
        z-index: 1000;
    }
    .drawer-plug .drawer-wrapper {
        position: fixed;
        padding: 10px;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1001;
        min-width: 350px;
        max-width: 80vw;
        background-color: #fff;
        opacity: 1;
    }
</style>
