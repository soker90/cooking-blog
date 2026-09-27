export const slugify = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getSlugFromPathname = (pathname) => {
    const filename = pathname.split(/[\\/]/).pop() ?? ''
    const extension = filename.includes('.') ? filename.slice(filename.lastIndexOf('.')) : ''
    return slugify(extension ? filename.slice(0, -extension.length) : filename)
}
