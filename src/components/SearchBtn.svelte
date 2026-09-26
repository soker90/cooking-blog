<script lang="ts">
    import SearchIcon from './SearchIcon.svelte'
    import { isSearchVisible } from '../store/search'

    function showSearchDialog() {
        isSearchVisible.set(true)
    }
</script>
<button type="button" aria-label="Buscar recetas" on:click={showSearchDialog}>
    <SearchIcon />
</button>
