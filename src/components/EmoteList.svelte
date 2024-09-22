<script lang="ts">
	// import { onMount } from "svelte"
	import Emote from "./emotelist/Emote.svelte"
	import type { EmoteData } from "../../emote_compiler/shared"
	// import Search from "./components/Search.svelte"
	export let data: EmoteData[]

	// let emotelist: HTMLElement
	// import { searchStore } from "$lib/stores/search"
	// onMount(() => {
	// 	let emotecards: NodeListOf<HTMLImageElement> = document.querySelectorAll("emotecard")

	// 	let throttle: NodeJS.Timeout
	// 	const lazyload = () => {
	// 		if (throttle) clearTimeout(throttle)

	// 		emotecards = document.querySelectorAll("emotecard") // document.querySelectorAll("img.lazy")

	// 		throttle = setTimeout(() => {
	// 			emotecards.forEach((card) => {
	// 				// if bottom of the viewport is beyond the top of the image, load it

	// 				if (window.innerHeight + emotelist.scrollTop > card.offsetTop) {
	// 					const image = card.querySelector("img")
	// 					if (image?.dataset.src) image.src = image.dataset.src
	// 				}
	// 			})
	// 		}, 40)
	// 	}

	// 	const unsubscribe = searchStore.subscribe(lazyload)

	// 	document.addEventListener("scroll", lazyload)
	// 	document.addEventListener("resize", lazyload)
	// 	screen.orientation.addEventListener("change", lazyload)
	// 	lazyload()

	// 	return () => {
	// 		// onDestroy
	// 		document.removeEventListener("scroll", lazyload)
	// 		document.removeEventListener("resize", lazyload)
	// 		screen.orientation.removeEventListener("change", lazyload)
	// 		unsubscribe()
	// 	}
	// })
</script>

<main class="bg-zinc-950 w-full overflow-y-scroll grid-flow-row grid-cols-4 grid text-center">
	{#each data as emote}
		<!-- <VirtualList items={data} itemHeight={336} {scrollTop} {containerHeight} let:item={emote}> -->
		<Emote {emote} />
		<!-- </VirtualList> -->
	{/each}
</main>
