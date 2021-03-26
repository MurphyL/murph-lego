<script>
	import pathGet from "lodash.get";
	import Loading from "../ui/loading.plug.svelte";
	import Error from "../ui/error.plug.svelte";
	import Debug from "./debug.plug.svelte";

	const { url, path } = $$props;

	const ajax = fetch(url)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error(res.json());
			}
		})
		.then((resp) => {
			return (path && path.length) ? pathGet(resp, path) : resp;
		});
</script>

{#await ajax}
	<Loading message="数据加载中……" />
{:then result}
	<slot {result}>
		<div>AJAX 请求成功！</div>
	</slot>
	<Debug data={result} />
{:catch error}
	<Error message={error.message} />
{/await}
