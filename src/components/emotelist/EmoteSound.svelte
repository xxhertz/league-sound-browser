<script lang="ts">
	import type { EmoteData } from "../../../emote_compiler/shared"
	import { volume } from "$lib/stores/volume"
	import { add, history } from "../../lib/stores/history"
	export let emote: EmoteData

	let audio: HTMLAudioElement
</script>

<button
	on:click={() => {
		audio.volume = $volume / 100
		audio.play()
		add(history, emote.id)
	}}
	class="group-hover:bg-opacity-75 bg-opacity-0 inset-0 rounded-2xl bg-zinc-950 w-full h-full absolute top-0 left-0 transition-colors duration-100"
>
	<svg class="relative left-1/2 -translate-x-1/2 group-hover:opacity-75 opacity-0 transition-opacity duration-100" width="64" height="64" viewBox="0 0 64 64">
		<circle cx="32" cy="32" r="31" class="stroke-zinc-950 stroke-2 opacity-50" />
		<path d="M24 16v32l24-16L24 16z" class="stroke-ultraviolet stroke-2 fill-periwinkle" />
	</svg>
</button>
<audio src="/finalized/{emote.id}.ogg" bind:this={audio} />
