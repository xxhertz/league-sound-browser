<script lang="ts">
	import { onDestroy } from "svelte"
	import { searchStore, searchHandler } from "../../../lib/stores/search"
	const unsubscribe = searchStore.subscribe(searchHandler)
	onDestroy(unsubscribe)
</script>

<input
	class="outline-none rounded-lg ring-0 w-full h-12 font-semibold p-4 mb-4 placeholder-current bg-zinc-950/40 border-2 border-transparent focus:border-eggshell text-eggshell"
	placeholder="Search emotes..."
	bind:value={$searchStore.search}
/>
