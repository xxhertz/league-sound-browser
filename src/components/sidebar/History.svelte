<script lang="ts">
	import { history, selected, toggle } from "$lib/stores/history"
	import { base } from "$app/paths"

	import { download } from "$lib"
	import type { EmoteData } from "../../../emote_compiler/shared"

	function downloadEmoteId(emote: EmoteData, webp: boolean, ogg: boolean) {
		if (webp) download(`${base}/finalized/${emote.id}.webp`, `${emote.name}.webp`)
		if (ogg) download(`${base}/finalized/${emote.id}.ogg`, `${emote.name}.ogg`)
	}

	function downloadEmotes(webp: boolean, ogg: boolean) {
		for (const emote of $selected) {
			downloadEmoteId(emote, webp, ogg)
		}
	}
</script>

<div class=" text-eggshell flex mb-2 p-2 font-semibold w-full text-left border-b-2 justify-between border-eggshell">
	<p>History</p>
	<details class="select-none cursor-pointer flex relative">
		<summary class="pl-4 marker:rotate-180 list-none">Download Selected</summary>
		<div class="absolute flex flex-col bottom-6 left-0 [&>*]:text-left">
			<button on:click={() => downloadEmotes(false, true)}>Sound</button>
			<button on:click={() => downloadEmotes(true, false)}>Image</button>
			<hr />
			<button on:click={() => downloadEmotes(true, true)}>Both</button>
		</div>
	</details>
</div>
<div class="w-full grid grid-cols-6 gap-2">
	{#each $history as emote}
		<button on:click={() => toggle(selected, emote)} class="rounded-lg border-2 {$selected.includes(emote) && 'border-periwinkle'} bg-black">
			<img src={emote.png} alt="" />
		</button>
	{/each}
</div>

<style lang="postcss">
	details summary::before {
		content: "▼";
		transform: rotate(-90deg);
		position: absolute;
		left: 0;
		transition: 0.2s ease;
	}

	details[open] summary::before {
		transform: rotate(-180deg);
	}
</style>
