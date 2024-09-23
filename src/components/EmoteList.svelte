<script lang="ts">
	import Emote from "./emotelist/Emote.svelte"
	import type { EmoteData } from "../../emote_compiler/shared"
	export let data: EmoteData[]

	// forget it! let's make our own virtualizer! yay!
</script>

<main class="bg-zinc-950 w-full overflow-y-scroll grid-flow-row grid-cols-4 grid text-center">
	{#each data as emote}
		<Emote {emote} />
	{/each}
</main>
