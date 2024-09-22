<script lang="ts">
	import { onMount } from "svelte"
	import type { EmoteData } from "../../../../emote_compiler/shared"
	import EmoteSound from "./EmoteSound.svelte"
	export let emote: EmoteData
	let image: HTMLImageElement
	let card: HTMLDivElement
	onMount(() => {
		if (window.innerHeight + window.scrollY > card.offsetTop) if (image.dataset.src) image.src = image.dataset.src
	})
</script>

<!-- I HATE NOT BEING ABLE TO ANIMATE THIS BACKGROUND GRADIENT I HATE IT SO MUCH THIS LOOKED SO MUCH COOLER BUT I HAD TO MAKE IT LOOK SO FUCKING LAME BECAUSE YOU CAN'T ANIMATE IT WITHOUT JS -->
<!-- or custom css properties which are disgusting -->
<div
	class="emotecard text-eggshell bg-gradient-to-b h-80 w-80 rounded-2xl hover:scale-[102%] mb-4 mt-4 mx-auto hover:via-periwinkle/50 via-eggshell/0 transition-all duration-100 from-eggshell/0 to-zinc-950"
	bind:this={card}
>
	<div class="relative group from-zinc-900 h-[calc(100%-2px)] w-[calc(100%-2px)] left-[1px] top-[1px] via-zinc-900 via-75% to-zinc-950 pb-4 pt-4 rounded-2xl bg-gradient-to-b">
		<img class="lazy block w-64 h-64 m-auto" draggable="false" src="/finalized/{emote.id}.webp" alt="" bind:this={image} />

		{#if emote.hasOgg}
			<EmoteSound {emote} />
		{/if}

		<p class="font-semibold">{emote.name}</p>
	</div>
</div>
