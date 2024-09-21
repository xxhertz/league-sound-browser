<script lang="ts">
	import type { EmoteData } from "../../../emote_compiler/shared"
	import EmoteSound from "./EmoteSound.svelte"
	export let emote: EmoteData
</script>

<!-- I HATE NOT BEING ABLE TO ANIMATE THIS BACKGROUND GRADIENT I HATE IT SO MUCH THIS LOOKED SO MUCH COOLER BUT I HAD TO MAKE IT LOOK SO FUCKING LAME BECAUSE YOU CAN'T ANIMATE IT WITHOUT JS -->
<div class="text-eggshell bg-gradient-to-b h-80 w-80 rounded-2xl hover:scale-[102%] mb-4 mt-4 mx-auto hover:via-eggshell/50 via-eggshell/0 transition-all duration-200 from-eggshell/0 to-zinc-950">
	<div class="relative group from-zinc-900 h-[calc(100%-2px)] w-[calc(100%-2px)] left-[1px] top-[1px] via-zinc-900 via-75% to-zinc-950 pb-4 pt-4 rounded-2xl bg-gradient-to-b">
		<img class="lazy block w-64 h-64 m-auto" draggable="false" data-src="/finalized/{emote.id}.webp" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="" />

		{#if emote.hasOgg}
			<EmoteSound {emote} />
		{/if}

		<p class="font-semibold">{emote.name}</p>
	</div>
</div>
