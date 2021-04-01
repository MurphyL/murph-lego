<script context="module">
    export const resolveProperties = (items = []) => {
        const result = {};
        items.forEach(({ unique, value}) => {
            result[unique] = value;
        });
        return result;
    };
</script>