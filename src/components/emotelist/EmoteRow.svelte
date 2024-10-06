<script lang="ts">
	import type { EmoteData } from "../../../emote_compiler/shared"
	import Emote from "./Emote.svelte"
	export let emotes: EmoteData[] // reactive, 4 if normal screen, decreasing all the way down to 1 on mobile
	export let index: number // which emote row are we?
	export let scrollPos: number // top page based
	export let bottomScreen: number

	const rowHeight = 320 + 24 // 320px height, 24px of padding
	$: rowPosition = index * rowHeight
	$: bottomOfRow = rowPosition + rowHeight
</script>

<!-- {#if rowPosition > scrollPos && bottomOfRow < scrollPos + bottomScreen} -->
{#if bottomOfRow > scrollPos && rowPosition < scrollPos + bottomScreen}
	<div class="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 p-4 grid grid-flow-row">
		{#each emotes as emote}
			<Emote {emote} />
		{/each}
	</div>
{:else}
	<div class="h-[344px] invisible" />
{/if}
