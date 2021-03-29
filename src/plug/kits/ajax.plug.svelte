<script context="module">
	import axios from "axios";
	import pathGet from "lodash/get";

	export const ajax = ({ method = "get", url, data, path }) => {
		return axios({
			method,
			url,
			data,
		}).then(({ status, data }) => {
			if (status !== 200) {
				throw new Error("接口调用失败");
			}
			return path && path.length ? pathGet(data, path) : data;
		});
	};
</script>

<script>
	import Loading from "../ui/loading.plug.svelte";
	import Error from "../ui/error.plug.svelte";
	import Debug from "./debug.plug.svelte";

	export let url = "";
	export let path = null;
</script>

{#await ajax({ url, path })}
	<Loading message="数据加载中……" />
{:then result}
	<slot {result}>
		<div>AJAX 请求成功！</div>
	</slot>
	<Debug data={result} title={`AJAX - ${url}`} />
{:catch error}
	<Error message={error.message} />
{/await}
