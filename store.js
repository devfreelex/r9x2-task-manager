import { storeFactory } from 'r9x_js'

const store = storeFactory({
    menuList: [
        { label: 'tasks', link: '#/' },
        { label: 'Nova task', link: '#/nova-task' },
    ],
    tasks: [
        {id: 1, title:'Tarefa número 1'},
        {id: 2, title:'Tarefa número 2'},
        {id: 3, title:'Tarefa número 3'},
    ]    
})

export { store }