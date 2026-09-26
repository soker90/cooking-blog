<script lang="ts">
    import { fade, fly } from 'svelte/transition'
    import { isSearchVisible } from '../store/search'
    import Search from './Search.svelte'

    const dismissModal = () => isSearchVisible.set(false)

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') dismissModal()
    }
</script>
<svelte:window on:keydown={handleKeydown} />
{#if $isSearchVisible}
    <button type="button" class="modal__backdrop" aria-label="Cerrar búsqueda" on:click={dismissModal} transition:fade></button>
    <div class="modal" role="dialog" aria-modal="true" aria-label="Buscar recetas">
        <div class="modal__cnt" transition:fly="{{ y: 200, duration: 300 }}">
            <Search />
        </div>
    </div>
{/if}
<style>
    @reference "../styles/global.css";
    .modal {
        @apply absolute top-0 left-0 w-full h-full grid justify-center content-center pointer-events-none;
    }
    .modal__backdrop {
        @apply absolute top-0 left-0 w-full h-screen opacity-50 bg-gradient-to-tr from-slate-600 to-slate-900 z-0 border-0 p-0 cursor-default;
    }
    .modal__backdrop:focus { @apply outline-none; }
    .modal__cnt {
        @apply w-full z-10 pointer-events-auto;
    }
</style>
