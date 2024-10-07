<script lang="ts">
	import type { EmoteData } from "../../../emote_compiler/shared"
	import EmoteSound from "./EmoteSound.svelte"
	export let emote: EmoteData
</script>

<!-- <div class=" hover:via-periwinkle/50 via-eggshell/0 transition-all duration-100 from-eggshell/0 to-zinc-950"> -->
<div class="relative text-eggshell group from-zinc-900 h-[calc(100%-2px)] w-[calc(100%-2px)] left-[1px] top-[1px] via-zinc-900 via-75% to-zinc-950 py-4 rounded-2xl bg-gradient-to-b">
	<img class="block w-64 h-64 m-auto object-contain" draggable="false" src={emote.png} alt="" />

	{#if emote.hasOgg}
		<EmoteSound {emote} />
	{/if}

	<p class="font-semibold">{emote.name}</p>
</div>

<!-- </div> -->

<style lang="postcss">
	div::after {
		content: "";
		position: absolute;
		height: calc(100% + 4px);
		width: calc(100% + 4px);
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		border-radius: 1rem;
		background: red;
		z-index: -1;
		/* padding: 10px; */
	}
	div:hover::after {
		background: black;
	}
</style>
