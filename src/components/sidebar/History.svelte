<script lang="ts">
	import { history, selected, toggle } from "../../lib/stores/history"
</script>

<div class="text-eggshell flex mb-2 p-2 font-semibold w-full text-left border-b-2 justify-between border-eggshell">
	<p>History</p>
	<button>Download</button>
</div>
<div class="w-full grid grid-cols-6 gap-2">
	{#each $history as emoteid}
		<button on:click={() => toggle(selected, emoteid)} class="rounded-lg border-2 {$selected.includes(emoteid) && 'border-periwinkle'} bg-black">
			<img class="" src="/finalized/{emoteid}.webp" alt="" />
		</button>
	{/each}
</div>
