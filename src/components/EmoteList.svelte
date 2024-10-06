<script lang="ts">
	import { onMount } from "svelte"
	import type { EmoteData } from "../../emote_compiler/shared"
	import EmoteRow from "./emotelist/EmoteRow.svelte"
	import { emoteRows } from "../lib/stores/emoterows"

	let scrollPos: number = 720 // good enough to render first 3 lines, will look odd on 4k and 1440p monitors but fixes on scroll
	let bottomScreen: number = 1080
	let rowCount: number = 4
	export let data: EmoteData[]
	let main: HTMLElement

	onMount(() => {
		function calcRows() {
			return data
				.map((_, i) => {
					if (i % rowCount === 0) return data.slice(i, i + rowCount)
				})
				.filter((row) => row !== undefined)
		}
		const updateScroll = () => {
			scrollPos = main.scrollTop
			bottomScreen = main.clientHeight
		}
		const updateRowCount = () => {
			const clientWidth = document.body.clientWidth
			// 2xl, xl, lg, default/mobile
			rowCount = clientWidth >= 1536 ? 4 : clientWidth >= 1280 ? 3 : clientWidth >= 1024 ? 2 : 1
			$emoteRows = calcRows()
			console.log("update rowcount")
		}

		updateScroll()
		updateRowCount()

		main.addEventListener("scroll", updateScroll)
		window.addEventListener("resize", updateRowCount)

		return () => {
			main.removeEventListener("scroll", updateScroll)
			window.removeEventListener("resize", updateRowCount)
		}
	})
</script>

<main bind:this={main} class="bg-zinc-950 w-full overflow-y-scroll gap-y-6 text-center text-white">
	{#if $emoteRows}
		{#each $emoteRows as emoteRow, index}
			<EmoteRow {bottomScreen} emotes={emoteRow} {index} {scrollPos} />
		{/each}
	{/if}
</main>
