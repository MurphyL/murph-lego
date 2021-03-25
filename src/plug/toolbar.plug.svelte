
<script>
    import {router} from 'tinro';

    import Button from './button.plug.svelte';

    export let config = { children: [] };
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
    const events = {
        'empty': console.log,
        'form-search': console.log,
        'form-reset': console.log,
        'form-advance-search': console.log,
        'page-config': console.log,
        'form-export': console.log,
    };
    const execute = (e) => {
        e.stopPropagation(); 
        const { kind, bind } = e.detail;
        switch(kind) {
            case 'link':
                return router.goto(bind); 
            default:
                console.log('未处理事件：', e.detail);
        }
    };
</script>

<div class="toolbar-plug container">
    <div class="toolbar-button-group toolbar-button-group-left">
        {#each left as { kind, bind, name }}
            <Button {kind} bind={bind} label={name} on:click={execute} />
        {/each}
    </div>
    {#if right.length}
        <div class="toolbar-button-group toolbar-button-group-right">
            {#each right as { kind, bind, name }}
                <Button {kind} bind={bind} label={name} on:click={execute} />
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
