<script>
    import { getContext } from "svelte";
    import pathGet from "lodash.get";
    import Drawer from "../ui/drawer.plug.svelte";
    import Debug from "../kits/debug.plug.svelte";
    import FormItem from "../form/form-item.plug.svelte";

    const config = getContext("schema_config");

    const { name, children } = pathGet(config, `schema.${$$props.key}`);
    const state = {
        childType: children[0]
    };
    const toggleDrawer = () => {
        state.showConfigDrawer = !state.showConfigDrawer;
    };
    const mapStruct = (items, type) => {
        switch(type) {
            case 'kinds':
                return items.map((key, index) => ({ index, value: key, label: pathGet(config, `schema.${key}.name`) }));
            case 'props':
                return items.map(({unique, name}, index) => ({ index, value: unique, label: name }));
        }
    };
    const props = (define) => {
        if(define.ref) {
            return pathGet(config, define.ref);
        }
        return {};
    };
    const formState = {};
</script>

<div class="child-item-plug">
    <div class="editor-toobar">
        <button data-action="item-config" on:click={toggleDrawer}>设置组件</button>
        <button data-action="add-item" on:click={toggleDrawer}>添加组件</button>
        {#if !$$props.root}
            <button data-action="remove-item" on:click={toggleDrawer}>删除组件</button>
        {/if}
    </div>
    <Drawer show={state.showConfigDrawer} on:close={toggleDrawer}>
        <h3>给《{name}》添加子组件</h3>
        <div>
            <FormItem name="选择类型" kind="select" children={mapStruct(pathGet(config, `schema.${$$props.key}.children`), 'kinds')} bind:value={formState.kind} />
        </div>
        <div>
            {#each pathGet(config, `schema.${$$props.key}.props`).map(props) as item, index}
                <FormItem name={item.name} kind="select" children={ mapStruct(item.options, 'props') } bind:value={formState[item.unique]} />
            {/each}
        </div>
        <Debug data={formState} />
    </Drawer>
    <slot />
</div>

<style>
    .child-item-plug {
        --form-item-cell: 1;
        position: relative;
        z-index: 100;
        height: 300px;
    }
    .child-item-plug :global(.child-item-plug) {
        margin-top: 50px;
    }
    .child-item-plug .editor-toobar {
        position: absolute;
        display: inline-block;
        right: 0;
        top: 0;
        visibility: hidden;
    }
</style>
