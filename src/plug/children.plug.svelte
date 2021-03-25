<script>
    import { getContext } from "svelte";
    import pathGet from "lodash.get";
    import Drawer from "./drawer.plug.svelte";
    import FormItem from "./form-item.plug.svelte";
    const schema = getContext("schema");
    const { key } = $$props;
    const { name, children } = schema[$$props.key];
    const state = {
        childType: children[0]
    };
    const toggleDrawer = () => {
        state.showConfigDrawer = !state.showConfigDrawer;
    };
    const addItem = () => {
        toggleDrawer();
    };
    const getSchema = (path) =>  pathGet(schema, `${key}.${path}`);
    const kinds = getSchema('children').map((key, index) => ({
        value: key,
        label: pathGet(schema, `${key}.name`)
    }));
</script>

<div class="child-editor-plug">
    <div class="editor-toobar">
        <button data-action="add-item" on:click={addItem}>添加组件</button>
    </div>
    <Drawer show={state.showConfigDrawer} on:close={toggleDrawer}>
        <h3>给【{name}】添加子组件</h3>
        <div>
            <FormItem name="选择类型" children={kinds} kind="select" />
        </div>
        <div>
            {#each getSchema('props') as item, index}
                <FormItem name={item.name} />
            {/each}
        </div>
        <pre>
            <code>{JSON.stringify(schema[state.childType], null, '  ')}</code>
        </pre>
    </Drawer>
</div>

<style>
    .child-editor-plug {
        --form-item-cell: 1;
        position: relative;
        z-index: 100;
    }
    .child-editor-plug .editor-toobar {
        position: absolute;
        display: inline-block;
        right: 0;
        top: 0;
        visibility: hidden;
    }
</style>
