<script lang="ts">
	import History from "./sidebar/History.svelte"
	import Search from "./sidebar/Search.svelte"
	import Volume from "./sidebar/Volume.svelte"
</script>

<aside class="relative min-w-[32rem] w-1/3 text-center py-32 px-16 bg-blend-luminosity bg-[radial-gradient(120%_100%_at_-20%_50%,rgba(24,24,27,1)_0%,rgba(9,9,11,1)_100%)]">
	<div class="relative bg-zinc-950/50 h-full p-4 rounded-lg backdrop-blur-lg">
		<Search />
		<Volume />
		<div class="absolute bottom-0 p-4 left-0 w-full">
			<History />
		</div>
	</div>
</aside>
