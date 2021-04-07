<script context="module">
    import pathGet from 'lodash/get';
    import at from 'lodash/at';
    import zipObject from 'lodash/zipObject';

    export const extract = ([ schema, specific ]) => {
        const items = [];
        const paths = [];
        (schema.rules || []).map(({ unique, path }) => {
            items.push(unique);
            paths.push(path || unique);
        });
        return zipObject(items, at(specific, paths));
    };

    export const title = ([ schema, specific ]) => {
        switch(schema.name) {
            case 'vega-lite-v2':
            default:
                return pathGet(specific, schema.title);
        }
    }

    export const marks = ([ schema, specific ]) => {
        switch(schema.name) {
            case 'vega-lite-v2':
            default:
                return pathGet(specific, schema.marks);
        }
    };
</script>