<script lang="ts">
	import { onDestroy } from "svelte"
	import { searchStore, searchHandler } from "../../lib/stores/search"
	import { volume } from "../../lib/stores/volume"
	const unsubscribe = searchStore.subscribe(searchHandler)

	onDestroy(unsubscribe)
</script>

<aside class="float-left w-[33.33%] text-center py-32 px-16 bg-[radial-gradient(120%_100%_at_-20%_50%,rgba(24,24,27,1)_0%,rgba(9,9,11,255)_100%)]">
	<input
		class="outline-none ring-0 w-full h-12 font-semibold p-4 placeholder-current bg-zinc-950/40 border-2 border-transparent focus:border-eggshell text-eggshell"
		placeholder="Search emotes..."
		bind:value={$searchStore.search}
	/>

	<label for="volume" class="text-eggshell">Volume</label>
	<input id="volume" class="w-full" type="range" bind:value={$volume} />
</aside>
