<script lang="ts">
	import "../app.css"
	import type { EmoteData } from "../../emote_compiler/shared"
	import EmoteList from "./components/EmoteList.svelte"
	// import Search from "./components/Search.svelte"
	export let data: { api: EmoteData[] }
</script>

<div class="flex h-screen">
	<EmoteList {data} />
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
