<script lang="ts">
	import type { EmoteData } from "../../../emote_compiler/shared"
	import EmoteSound from "./EmoteSound.svelte"
	export let emote: EmoteData
	export let index: number
	export let scrollPos: number
</script>

<!-- I HATE NOT BEING ABLE TO ANIMATE THIS BACKGROUND GRADIENT I HATE IT SO MUCH THIS LOOKED SO MUCH COOLER BUT I HAD TO MAKE IT LOOK SO FUCKING LAME BECAUSE YOU CAN'T ANIMATE IT WITHOUT JS -->
<!-- or custom css properties which are disgusting -->
<!-- forget it! let's make our own makeshift virtualizer! yay! all the svelte virtualizers are GARBAGE for grids -->
<!-- tbh this can remain divided by 4, realistically it should be responsive like the document but idgaf it's good enough -->

{#if scrollPos > Math.floor(index / 4) * (312 + 24)}
	<div class="text-eggshell bg-gradient-to-b w-full rounded-2xl hover:scale-[102%] hover:via-periwinkle/50 via-eggshell/0 transition-all duration-100 from-eggshell/0 to-zinc-950">
		<div class="relative group from-zinc-900 h-[calc(100%-2px)] w-[calc(100%-2px)] left-[1px] top-[1px] via-zinc-900 via-75% to-zinc-950 pb-4 pt-4 rounded-2xl bg-gradient-to-b">
			<img class="lazy block w-64 h-64 m-auto" draggable="false" src="/finalized/{emote.id}.webp" alt="" />

			{#if emote.hasOgg}
				<EmoteSound {emote} />
			{/if}

			<p class="font-semibold">{emote.name}</p>
		</div>
	</div>
{:else}
	<div style={"height:312px"} />
{/if}
