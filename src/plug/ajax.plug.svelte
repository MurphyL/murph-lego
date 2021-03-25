<script>
	import pathGet from "lodash.get";
	import Loading from "./loading.plug.svelte";
	import Error from "./error.plug.svelte";

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
	<slot {result} />
{:catch error}
	<Error message={error.message} />
{/await}
