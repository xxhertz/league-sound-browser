<script lang="ts">
	import type { EmoteData } from "../../../emote_compiler/shared"

	export let emote: EmoteData

	let audio: HTMLAudioElement
	let imgLoaded: boolean
</script>

<div class="relative text-eggshell bg-gradient-to-b from-zinc-900 via-zinc-900 via-75% to-zinc-950 h-80 w-80 rounded-2xl mb-4 pb-4 mt-4 mx-auto group">
	{#if !imgLoaded}
		<div class="w-64 aspect-square" />
	{/if}
	<img class="lazy m-auto align-middle text-center" data-src="/finalized/{emote.id}.webp" alt="" on:load={() => (imgLoaded = true)} />

	{#if emote.hasOgg}
		<button on:click={() => audio.play()} class="group-hover:bg-opacity-75 bg-opacity-0 inset-0 bg-zinc-950 w-full h-full absolute top-0 left-0 transition-colors duration-500">
			<svg class="relative left-1/2 -translate-x-1/2 group-hover:opacity-75 opacity-0 transition-opacity duration-500" width="64" height="64" viewBox="0 0 64 64">
				<circle cx="32" cy="32" r="31" stroke="none" class="stroke-zinc-950 stroke-2 opacity-50" />
				<path d="M24 16v32l24-16L24 16z" class="stroke-ultraviolet stroke-2 fill-periwinkle" />
			</svg>
		</button>

		<audio src="/finalized/{emote.id}.ogg" bind:this={audio} />
	{/if}

	<p>{emote.name}</p>
</div>
