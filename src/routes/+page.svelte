<script lang="ts">
	import type { EmoteData } from "../../emote_compiler/shared"
	export let data: { api: EmoteData[] }
	import "../app.css"

	import EmoteList from "./../components/EmoteList.svelte"
	import Sidebar from "./../components/Sidebar.svelte"

	import { searchStore } from "../lib/stores/search"
	$searchStore.data = data.api
</script>

<div class="flex h-screen">
	<Sidebar />

	<EmoteList data={$searchStore.filtered} />
</div>

<svelte:head>
	<title>League Emote Browser</title>
</svelte:head>
