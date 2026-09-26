<script lang="ts">
    import { onMount } from 'svelte'
    import SearchIcon from './SearchIcon.svelte'
    import PostSearchPreview from './PostSearchPreview.svelte'

    let searchInput
    let searchableDocs
    let searchIndex

    let searchQuery = ''
    let searchResults = []

    onMount(() => {
        let isMounted = true

        const loadSearch = async() => {
            const lunr = (await import('lunr')).default
            const resp = await fetch('/search-index.json')
            searchableDocs = await resp.json()
            // Initialize indexing
            searchIndex = lunr(function(){
            // the match key...
            this.ref('slug')

            // indexable properties
            this.field('title')
            this.field('description')
            this.field('tags')

            // Omit, if you don't want to search on `body`
            this.field('body')

            // Index every document
                searchableDocs.forEach(doc => {
                    this.add(doc)
                }, this)
            })
            if (isMounted) {
                searchInput?.focus()
            }
        }

        loadSearch()

        return () => {
            isMounted = false
        }
    })

    $: {
        if(searchQuery.length >= 3 && searchIndex && searchableDocs) {
            const matches = searchIndex.search(searchQuery)
            searchResults = []
            matches.map(match => {
                searchableDocs.filter(doc => {
                    if(match.ref === doc.slug) {
                        searchResults.push(doc)
                    }
                })
            })
        } else {
            searchResults = []
        }
    }
</script>
<div class="search">
    <div class="search__ctrl">
        <label for="search"><SearchIcon found={searchResults.length > 0} /></label>
        <input id="search" type="text" name="search" aria-label="Buscar recetas" bind:this={searchInput} placeholder="Buscar..." bind:value={searchQuery} />
    </div>
    <div class="search__results" aria-live="polite" aria-atomic="false">
        {#if searchResults.length}
            {#each searchResults as post, i }
                <PostSearchPreview post={post} isLast={ i === searchResults.length - 1 } />
            {/each}
        {:else}
            <div class="search__results--none">
                {#if searchQuery.length}
                    No se han encontrado recetas
                {:else}
                    Buscar recetas...
                {/if}
            </div>
        {/if}
    </div>
    <div class="note"><small>Pulsa Esc o en el fondo para cerrar la búsqueda</small></div>
</div>
<style>
    @reference "../styles/global.css";
    .search {
        @apply w-full relative bg-theme-primary  p-8  rounded-md shadow-lg;
    }
    input {
        @apply w-full px-4 py-2 pl-10 text-xl font-semibold text-gray-600 border-0 shadow-inner rounded-md bg-gray-100 placeholder-theme-dark-secondary;
    }
    .search__ctrl {
        @apply pb-4 relative;
    }
    .search__ctrl label {
        @apply text-theme-primary absolute top-2 left-2;
    }
    .search__results {
        @apply w-96 h-64 py-4 overflow-y-auto;
    }
    .search__results--none {
        @apply  text-center text-theme-dark-primary;
    }
    .note {
        @apply w-full text-center text-white;
    }
</style>
