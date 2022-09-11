import type{ NavItems } from './types'

export const NAV_ITEMS: NavItems = {
    home: {
        path: '/',
        title: 'inicio'
    },
    tags: {
        path: '/tags',
        title: 'cateogorías'
    },
    about: {
        path: '/acerca',
        title: 'Acerca'
    }
}

export const SITE = {
    // Your site's detail?
    name: 'Cocina con Edu',
    title: 'Cocina Edu',
    description: 'Las recetas de Edu',
    url: 'https://recetas.eduardoparra.es',
    githubUrl: 'https://github.com/soker90/cooking-blog',
    listDrafts: true
}

export const PAGE_SIZE = 8
