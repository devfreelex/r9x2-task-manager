import { store } from "../store.js"

const appCreate = () => {

    const state = {
        isValid: false
    }

    const template = ({state, props}) => {
        const notification = (isValid) => {
            if (!isValid) return /*html*/`<div class="notification">Digite ao menos 5 caracteres para salvar.</div>`
            return ''
        }
        return /*html*/`
            <div class="create-wrapper">
                <label>
                    <span>Título da tarefa</span>
                    <input id="task"/>
                    ${notification(state.isValid)}
                </label>
                <label>
                    <button ${!state.isValid ? 'disabled' : ''}>Adicionar</button>
                </label>
            </div>
        `
    }

    const styles = () => {
        return /*css*/`
            app-create .create-wrapper {
                display:block;
                float:left;
                width:100%;
                padding:15px;
                margin-top: 15px;
                border: 1px #ebebeb solid;
                box-sizing:border-box
            }

            app-create label,
            app-create span,
            app-create input {
                display:block;
                float:left;
                width:100%;
                box-sizing:border-box;
            }

            app-create input {
                padding:15px;
                border:1px #ebebeb solid;
                border-radius:3px;
                outline:0;
            }

            app-create button {
                display:block;
                float:right;
                padding:10px;
                margin-top:15px;
                border:1px blue solid;
                background:#fff;
                color:blue;
                font-size: .875em:
                outline:0
            }

            app-create button:disabled {
                background:#ebebeb;
                color:#fff;
                border:0;
            }

            app-create .notification {
                display:block;
                float:left;
                width:100%;
                padding:15px;
                color:red
            }
        `
    }

    const hooks = ({elm}) => ({
        beforeOnInit () {
            console.log(elm)
        }
    })

    const events = ({query, on, methods}) => ({
        onClickToSave () {
            const btnAdd = query('button')
            const inputTask = query('#task')
            on('click', [btnAdd], () => methods.addTask(inputTask.value))
        },
        onInputTask () {
            const input = query('#task')
            on('keyup', [input], methods.debounce(methods.validate, 300))
        }
    })

    const methods = ({props, state}) => ({
        addTask (taskTitle) {
            const task = {id: store.get().tasks.length + 1, title: taskTitle}
            store.update((state) => state.tasks.push(task))
        },
        validate ({target}) {
            const value = target.value
            const isValid = value && value.length >= 5 ? true : false
            state.set({isValid})
            setTimeout(() => {
                const element = document.querySelector('#task')
                element.value = value
                element.focus()
            },100)
        },
        debounce (handler, delay) {
            let debounceTimer

            return (e) => {
                clearTimeout(debounceTimer)
                debounceTimer = setTimeout(() => handler(e), delay)
            }
        }
    })

    return {
        state,
        template,
        styles,
        methods,
        events,
        hooks
    }
}

export { appCreate }