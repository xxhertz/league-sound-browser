<script lang="ts">
	// import Search from "./components/Search.svelte"
	export let data
</script>

<main>
	<!-- <Search /> -->
	{#each data.api as iconEmote}
		{iconEmote.name}
	{/each}
</main>

<style>
	@keyframes fade-in {
		from {
			background: #0f0f0f;
		}
		to {
			background: #1b1b1b;
		}
	}
	:global(body) {
		margin: 0;
	}

	main {
		animation: fade-in forwards linear 200ms;
		width: 100vw;
		height: 100vh;
	}
</style>
