<script lang="ts">
	import { volume } from "$lib/stores/volume"
	volume.set(50)
</script>

<label for="volume" class="text-eggshell text-left">Volume: {Math.round($volume)}%</label>
<input id="volume" class="w-full accent-periwinkle" type="range" bind:value={$volume} />
