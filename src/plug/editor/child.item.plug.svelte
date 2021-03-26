<script>
    import shortid from 'shortid';
    import pathGet from 'lodash.get';
    import pathSet from 'lodash.set';

    import store from "../../plug/editor/editor.store";

    import * as SchemaUtils from "../kits/schema.utils.js";

    import Drawer from "../ui/drawer.plug.svelte";
    import Debug from "../kits/debug.plug.svelte";
    import FormItem from "../form/form-item.plug.svelte";

    const { kind, unique, path, index, target } = $$props;

    const { name, children, props } = SchemaUtils.schemaPathGet(kind);

    const properties = {};

    const drawerState = {};

    let elementType = children[0];

    const toggleDrawer = ({ target }) => {
        if (!target) {
            return (drawerState.showConfigDrawer = false);
        }
        drawerState.action = target.dataset.action;
        drawerState.showConfigDrawer = !!target.dataset.action;
    };
    const descAction = () => {
        const temp = `${name} - ${unique}`;
        switch (drawerState.action) {
            case "add-item":
                return `给《${temp}》新增组件`;
            case "item-config":
                return `修改组件《${temp}》配置`;
            case "remove-item":
                return `删除组件《${temp}》`;
        }
    };
    const join = (...parts) => {
        return parts.filter(item => item && item.length > 0).join('.')
    };
    const postDetails = () => {
        switch (drawerState.action) {
            case "item-config":
                return store.update((state) => {
                    if(path) {
                        return state;
                    } else {
                        return Object.assign(state, properties);
                    }
                });
            case "add-item":
                return store.update((state) => {
                    const target = join(path, 'children');
                    const items = pathGet(state, target) || [];
                    items.push({
                        target,
                        kind: elementType,
                        index: items.length,
                        unique: shortid.generate(),
                        path: `${target}[${items.length}]`, 
                    });
                    return pathSet(state, target, items);
                });
            case "remove-item":
                return store.update((state) => {
                    const items = pathGet(state, target);
                    if(items) {
                        pathSet(state, target, items.filter(item => item.path !== path));
                    }
                    return state;
                });
        }
    };
</script>

<div class="child-item-plug child-{index || 'first'}" data-index={ index || 0 } data-show={JSON.stringify({ path: path || '', unique, name })}>
    <div class="editor-toobar">
        <button data-action="item-config" on:click={toggleDrawer}>设置组件</button>
        <button data-action="add-item" on:click={toggleDrawer}>添加组件</button>
        {#if path}
            <button data-action="remove-item" on:click={toggleDrawer}>删除组件</button>
        {/if}
    </div>
    <slot />
    <Drawer show={drawerState.showConfigDrawer} on:close={toggleDrawer}>
        <h3>{descAction()}</h3>
        <div class="props-group">
            {#if drawerState.action === 'add-item'}
                <FormItem
                    kind="select"
                    name="选择类型"
                    bind:value={elementType}
                    defaultValue={elementType}
                    children={SchemaUtils.schemaChildrenMapStruct(children)}
                />
            {/if}
            {#each SchemaUtils.getSchemaProperties(props) as item}
                <FormItem
                    kind="select"
                    name={item.name}
                    children={item.options}
                    defaultValue={properties[item.unique]}
                    bind:value={properties[item.unique]}
                />
            {/each}
        </div>
        <button on:click={postDetails}>确定</button>
        <Debug title="组件设置信息" data={{ properties }} />
    </Drawer>
</div>

<style>
    .child-item-plug {
        position: relative;
        margin: 5px;
        --form-item-cell: 1;
        z-index: 100;
        min-height: 200px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .child-item-plug::before {
        position: absolute;
        left: 10px;
        top: 5px;
        color: #ccc;
        content: attr(data-show);
    }
    .child-item-plug :global(.child-first) {
        margin-top: 50px;
    }
    .child-item-plug .editor-toobar {
        position: absolute;
        display: inline-block;
        right: 10px;
        top: 10px;
        visibility: hidden;
    }
    .child-item-plug :global(.drawer-wrapper h3) {
        margin: 10px 0;
    }
    .child-item-plug:hover .editor-toobar {
        visibility: visible;
    }
</style>
