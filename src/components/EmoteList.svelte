<script lang="ts">
	import { onMount } from "svelte"
	import type { EmoteData } from "../../emote_compiler/shared"
	import Emote from "./emotelist/Emote.svelte"

	let scrollPos: number = 720 // good enough to render first 3 lines, will look odd on 4k and 1440p monitors but fixes on scroll

	export let data: EmoteData[]
	let main: HTMLElement
	onMount(() => {
		const updateScroll = () => (scrollPos = main.scrollTop + main.clientHeight)
		main.addEventListener("scroll", updateScroll)
		return () => main.removeEventListener("scroll", updateScroll)
	})
</script>

<main bind:this={main} class="bg-zinc-950 w-full overflow-y-scroll grid-flow-row 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 p-4 gap-x-8 gap-y-6 grid text-center">
	{#each data as emote, index}
		<Emote {emote} {index} {scrollPos} />
	{/each}
</main>
