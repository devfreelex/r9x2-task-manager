import { store } from '../store'

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
        }
    })

    const events = ({query, on, methods, directives}) => ({
        onClickToSave () {
            const btnAdd = query('button')
            const input = query('#task')
            const id = input.getAttribute('id')
            on('click', [btnAdd], () => {
                methods.addTask(input.value)
                directives.focusOnChange(input, `#${id}`)
                directives.clearInput(input)
            })
        },
        onInputTask () {
            const input = query('#task')
            const id = input.getAttribute('id')
            let value = ''
            
            on('keyup', [input], ({target}) => {
                value = target.value
                directives.validate(input)
                directives.focusOnChange(input, `#${id}`)                
            })

            directives.focusAfterOnRender(input, value)
        }
    })

    const methods = ({elm, props, state}) => ({
        addTask (taskTitle) {
            const task = {id: store.get().tasks.length + 1, title: taskTitle}
            store.update((storeState) => {
                storeState.tasks.push(task)
            })
        },
        debounce (handler, delay) {
            let debounceTimer

            return (e) => {
                clearTimeout(debounceTimer)
                debounceTimer = setTimeout(() => handler(e), delay)
            }
        }
    })

    const directives = ({props, state, methods, query, queryAll}) => ({
        validate (input) { 
            const value = input.value
            const isValid = value && value.length >= 5 ? true : false
            state.set({ isValid })      
        },
        clearInput (input) {
            input.value = ''
        },
        focusOnChange (input, selector) {
            const inputToUpdate = query(selector)
            inputToUpdate.value = input.value
            inputToUpdate.focus() 
        },
        focusAfterOnRender (input, value) {
            input.value = value
            input.focus()
        }
    })

    return {
        state,
        template,
        styles,
        methods,
        directives,
        events,
        hooks
    }
}

export { appCreate }