<script lang="ts">
	import { onMount } from "svelte"
	import Emote from "./emotelist/Emote.svelte"
	import type { EmoteData } from "../../../emote_compiler/shared"
	// import Search from "./components/Search.svelte"
	export let data: EmoteData[]
	import { searchStore } from "$lib/stores/search"
	onMount(() => {
		let images: NodeListOf<HTMLImageElement> = document.querySelectorAll("img.lazy")

		let throttle: NodeJS.Timeout
		const lazyload = () => {
			if (throttle) clearTimeout(throttle)

			images = document.querySelectorAll("img.lazy")

			throttle = setTimeout(() => {
				images.forEach((image) => {
					// if bottom of the viewport is beyond the top of the image, load it
					if (window.innerHeight + window.scrollY > image.offsetTop) if (image.dataset.src) image.src = image.dataset.src
				})
			}, 40)
		}

		const unsubscribe = searchStore.subscribe(lazyload)

		document.addEventListener("scroll", lazyload)
		document.addEventListener("resize", lazyload)
		screen.orientation.addEventListener("change", lazyload)
		lazyload()

		return () => {
			// onDestroy
			document.removeEventListener("scroll", lazyload)
			document.removeEventListener("resize", lazyload)
			screen.orientation.removeEventListener("change", lazyload)
			unsubscribe()
		}
	})
</script>

<main class="bg-zinc-950 w-full overflow-y-scroll">
	<div class="grid-flow-row grid-cols-4 grid text-center">
		{#each data as emote}
			<Emote {emote} />
		{/each}
	</div>
</main>
