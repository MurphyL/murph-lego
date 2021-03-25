<script context="module">
	import Loading from "./loading.plug.svelte";
	import Error from "./error.plug.svelte";


</script>

<script>
	import lodashGet from "lodash.get";
	const { url, path, uuid } = $$props;

	const ajax = (url) =>
		fetch(url).then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error(res.json());
			}
		});
</script>

{#await ajax(url + '?uuid=' + uuid)}
	<Loading message="数据加载中……" />
{:then result}
	<slot result={lodashGet(result, path || "")} />
{:catch error}
	<Error message={error.message} />
{/await}
