import type{ NavItems } from './types'

export const NAV_ITEMS: NavItems = {
    home: {
        path: '/',
        title: 'inicio'
    },
    tags: {
        path: '/tags',
        title: 'categorías'
    },
    about: {
        path: '/acerca',
        title: 'Acerca'
    }
}

export const SITE = {
    name: 'Cocina con Edu',
    title: 'Cocina con Edu',
    description: 'Las recetas de Edu',
    url: 'https://recetas.eduardoparra.es',
    githubUrl: 'https://github.com/soker90/cooking-blog',
    listDrafts: true
}

export const PAGE_SIZE = 8
