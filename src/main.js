import App from './core/app.svelte';

const app = new App({
	target: document.body,
	props: {
		APP_ENV: _APP_ENV
	}
});

export default app;