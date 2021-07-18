export default [
    {
        path: '/todos',
        name: 'Todos',
        component: () => import( './views/todos')
    },
    {
        path: '/todos/create',
        name: 'TodosCreate',
        component: () => import( './views/todosCreate')
    },
    {
        path: '/todos/:id',
        name: 'TodosView',
        component: () => import( './views/todosView')
    },
]