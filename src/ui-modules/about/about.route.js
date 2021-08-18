import testLayout from '@/layouts/testLayout'
export default [
    {
        path: '/about',
        name: 'About',
        meta: {
            layout: testLayout
        },
        component: () => import('./views/About.vue')
    }
]