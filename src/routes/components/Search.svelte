<script lang="ts">
	let searchText = ""
</script>

<div>
	<input bind:value={searchText} on:keydown={() => console.log(searchText)} type="text" />
</div>
