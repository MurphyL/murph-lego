<!-- 数据操作工具类 -->
<script context="module">
    import { get, set, assign, remove, trim, isArray, isString, isNumber } from "lodash";

    const pathMaker = (paths) => {
        if (!paths || paths.length === 0) {
            return "";
        }
        if (isArray(paths)) {
            return paths.filter(item => isString(item) || isNumber(item)).map(trim).join(".");
        }
        return trim(paths);
    };

    /**
     * lodash.set
     * @param state (Object): The object to modify.
     * @param path (Array|string): The path of the property to set.
     * @param value (*): The value to set.aultValue
     */
    export const pathSet = (state, path, value) => {
        return set(state, pathMaker(path), value);
    };

    /**
     * lodash.get wrapper
     *
     * @param state (Object): The object to query.
     * @param path path (Array|string): The path of the property to get.
     * @param defaultValue [defaultValue] (*): The value returned for undefined resolved values.
     */
    export const pathGet = (state, path, defaultValue) => {
        return get(state, pathMaker(path), defaultValue);
    };

    export const pathArrayRemove = (state, path, index) => {
        const targetArray = pathGet(state, path, []);
        remove(targetArray, (item, i) => i === index);
        return pathSet(state, path, targetArray);
    };

    export const pathObjectAssign = (state, path, index, properties) => {
        if (trim(path).length === 0) {
            return assign(state, properties);
        } else {
            const target = pathGet(state, path, {});
            if(isArray(target)) {
                assign(target[index], properties); 
            }
            return pathSet(state, path, assign(target, properties));
        }
    };

    export const pathArrayPush = (state, path, newElement) => {
        const targetArray = pathGet(state, path, []);
        targetArray.push(
            assign(newElement, {
                parent: pathMaker(path),
            })
        );
        return pathSet(state, path, targetArray);
    };
</script>
