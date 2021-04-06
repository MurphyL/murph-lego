<script context="module">
    import pathGet from 'lodash/get';

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