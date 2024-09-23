<script lang="ts">
	import Emote from "./emotelist/Emote.svelte"
	import type { EmoteData } from "../../emote_compiler/shared"
	import { onMount } from "svelte"
	export let data: EmoteData[]
	// forget it! let's make our own virtualizer! yay! all the svelte virtualizers are GARBAGE for grids
	let columnCount = 4 //window.innerWidth >= 1536 ? 4 : window.innerWidth >= 1280 ? 3 : window.innerWidth >= 1024 ? 2 : 1
	let container: HTMLElement
	let measureCard: HTMLElement
	onMount(() => {
		const frame = requestAnimationFrame(function onFrame() {
			console.log(window.innerWidth)
			if (window.innerWidth >= 1536)
				columnCount = 4 // 2xl
			else if (window.innerWidth >= 1280)
				columnCount = 3 // xl
			else if (window.innerWidth >= 1024)
				columnCount = 2 // lg
			else columnCount = 1 // default (mobile first)
			requestAnimationFrame(onFrame)
		})

		const containerRect = container.getBoundingClientRect()
		const elementRect = measureCard.getBoundingClientRect()

		return () => cancelAnimationFrame(frame)
	})
</script>

<main class="bg-zinc-950 w-full overflow-y-scroll grid-flow-row 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 p-4 gap-x-8 gap-y-6 grid text-center">
	<Emote emote={data[0]} hidden={true} />
	{#each data as emote}
		<Emote {emote} />
	{/each}
</main>
