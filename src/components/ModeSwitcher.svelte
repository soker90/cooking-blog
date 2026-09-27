<script lang="ts">
    import { onMount } from 'svelte'

    type ThemeType = 'dark' | 'light'

    const THEME_DARK: ThemeType = 'dark'
    const THEME_LIGHT: ThemeType = 'light'
    let currTheme: ThemeType = typeof document !== 'undefined' && document.documentElement.classList.contains(THEME_DARK)
        ? THEME_DARK
        : THEME_LIGHT

    function toggleTheme() {
        currTheme = currTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK
        window.document.documentElement.classList.toggle(THEME_DARK, currTheme === THEME_DARK)
        document.documentElement.style.colorScheme = currTheme
        document.querySelector<HTMLMetaElement>('#theme-color')?.setAttribute('content', currTheme === THEME_DARK ? '#1f2937' : '#f3f4f6')

        try {
            localStorage.setItem('theme', currTheme)
        } catch {
            // Keep the selected theme for this page when browser storage is unavailable.
        }
    }

    onMount(() => {
        currTheme = document.documentElement.classList.contains(THEME_DARK)
            ? THEME_DARK
            : THEME_LIGHT
    })
</script>
<button type="button" aria-label={currTheme === THEME_DARK ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} onclick={toggleTheme}>
    <slot theme={currTheme}/>
</button>
