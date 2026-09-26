<script lang="ts">
    import { onMount } from 'svelte'
    import { fade, fly } from 'svelte/transition'
    import { isSearchVisible } from '../store/search'
    import Search from './Search.svelte'

    let dialog: HTMLDivElement
    let previousActiveElement: HTMLElement | null = null

    const getFocusableElements = () => {
        if (!dialog) return []
        return Array.from(dialog.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ))
    }

    const dismissModal = () => isSearchVisible.set(false)

    const handleKeydown = (event: KeyboardEvent) => {
        if (!$isSearchVisible) return

        if (event.key === 'Escape') {
            event.preventDefault()
            dismissModal()
            return
        }

        if (event.key !== 'Tab') return

        const focusableElements = getFocusableElements()
        if (!focusableElements.length) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        const focusIsOutsideDialog = !dialog?.contains(document.activeElement)

        if (event.shiftKey && (document.activeElement === firstElement || focusIsOutsideDialog)) {
            event.preventDefault()
            lastElement.focus()
        } else if (!event.shiftKey && (document.activeElement === lastElement || focusIsOutsideDialog)) {
            event.preventDefault()
            firstElement.focus()
        }
    }

    onMount(() => {
        const unsubscribe = isSearchVisible.subscribe(visible => {
            if (visible) {
                previousActiveElement = document.activeElement instanceof HTMLElement
                    ? document.activeElement
                    : null
            } else if (previousActiveElement) {
                previousActiveElement.focus()
                previousActiveElement = null
            }
        })

        return unsubscribe
    })
</script>
<svelte:window on:keydown={handleKeydown} />
{#if $isSearchVisible}
    <button type="button" class="modal__backdrop" aria-label="Cerrar búsqueda" on:click={dismissModal} transition:fade></button>
    <div class="modal" role="dialog" aria-modal="true" aria-label="Buscar recetas" bind:this={dialog}>
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
