<script context="module">
    import axios from "axios";

    export const ajax = ({ method = "GET", url = "", data = {} }) => {
        return axios({ method, url, data }).then(({ data, status }) => {
            if (status === 200) {
                return data;
            }
            throw new Error('调用数据接口失败');
        });
    };
</script>
