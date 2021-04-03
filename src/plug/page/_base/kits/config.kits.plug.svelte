<script context="module">
    export const resolveProperties = (items = []) => {
        const result = {};
        items.forEach(({ unique, value, ...extra}) => {
            result[unique] = {
                value, ...extra
            };
        });
        return result;
    };


    export const resolveChildren = (items = []) => {
        console.log(items)
        return [];
    }
</script>