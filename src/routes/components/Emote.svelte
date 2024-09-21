<script lang="ts">
	import type { EmoteData } from "../../../emote_compiler/shared"

	export let emote: EmoteData

	let audio: HTMLAudioElement
</script>

<div
	class="text-eggshell bg-zinc-900 h-80 w-80 rounded-2xl mb-4 mt-4 m-auto"
	on:click={() => audio.play()}
>
	{emote.id}
	<img
		class="lazy m-auto align-middle text-center"
		data-src="/finalized/{emote.id}.webp"
		alt={emote.name}
	/>
	{#if emote.hasOgg}
		<audio src="/finalized/{emote.id}.ogg" bind:this={audio} />
	{/if}
</div>
