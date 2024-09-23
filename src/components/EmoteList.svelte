<script lang="ts">
	import Emote from "./emotelist/Emote.svelte"
	import type { EmoteData } from "../../emote_compiler/shared"
	export let data: EmoteData[]

	// forget it! let's make our own virtualizer! yay!
</script>

<main class="bg-zinc-950 w-full overflow-y-scroll grid-flow-row 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 p-4 gap-x-8 gap-y-6 grid text-center">
	{#each data as emote}
		<Emote {emote} />
	{/each}
</main>
