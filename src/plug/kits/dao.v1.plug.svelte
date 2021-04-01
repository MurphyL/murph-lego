<!-- 数据操作工具类 -->
<script context="module">
    import get from "lodash/get";
    import set from "lodash/set";
    import remove from "lodash/remove";
    import assign from "lodash/assign";
    import trim from "lodash/trim";
    import isArray from "lodash/isArray";
    import isString from "lodash/isString";

    export const makePath = (path) => {
        if (isString(path)) {
            return trim(path);
        } else if (isArray(path)) {
            return path.filter(item => item !== null && item !== undefined).join(".");
        } else {
            return "";
        }
    };

    export const pathGet = (path, state, defaultValue) => {
        const target = makePath(path);
        if (trim(target).length === 0) {
            return state;
        }
        return get(state, target, defaultValue);
    };

    export const pathSet = (path, state, value) => {
        const target = makePath(path);
        if (trim(target).length === 0) {
            return assign(state, value);
        } else {
            return set(state, target, value);
        }
    };

    export const indexRemove = (index, items) => {
        remove(items, (o, i) => i === index);
        return items;
    };
</script>
