import { store } from '../store'
import { appCreate } from './appCreate.component'

const appTasks = () => { 

    const tagName = 'app-tasks'

    const state = {
        title: 'Tasks',
        tasks: store.get().tasks
    }

    const template = ({state, props}) => {
        const taskList = (list) => {
            return list.map( item => /*html*/`
            <li class="list-item">
                ${item.title} <div id="${item.id}" class="btn-remove">x</div>
            </li>`).join('')
        }
        return /*html*/`
            <div class="task-wrapper">
                <h1 class="title">${state.title}</h1>
                <app-create></app-create>
                <ul class="task-list">
                    ${taskList(state.tasks)}
                </ul>
            </div>
        `
    }

    const styles = () => {
        return /*css*/`
            app-tasks .title { 
                display:block;
                float:left;
                width:100%;
                font-size: 1.5em;
                text-transform: uppercase;   
                padding: 0 15px; 
            }

            app-tasks .task-list {
                display:block;
                float:left;
                width: 100%;
                border: 1px #ebebeb solid;
                padding:0;
            }

            app-tasks .list-item {
                display:block;
                float:left;
                width:100%;
                border-bottom:1px #ebebeb solid;
                padding:15px 30px;
                box-sizing: border-box
            }

            app-tasks .btn-remove {
                display:block;
                float:right;
                padding:5px 10px;
                border:1px red solid;
                color:red;
                cursor: pointer
            }
        `
    }

    const children = () => ({
        appCreate
    })

    const hooks = ({state, methods}) => ({
        beforeOnInit () {
            store.subscribe((data) => {
                state.set(data)
            })
        }
    })

    const events = ({query, queryAll, on, methods}) => ({
        onClickToRemove () {
            const btnRemove =  queryAll('.btn-remove')
            on('click', btnRemove, methods.removeTask)
        }
    })

    const methods = ({props, state}) => ({
        removeTask ({target}) {
            store.update((storeState) => {
                const id = +target.getAttribute('id')
                const tasks = storeState.tasks.filter(task => task.id !== id)
                storeState.tasks = tasks
            })
        }
    })


    return {
        tagName,
        state,
        template,
        styles,
        children,
        hooks,
        events,
        methods
    }
}

export { appTasks }