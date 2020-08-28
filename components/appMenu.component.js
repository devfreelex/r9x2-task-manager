import { store } from '../store.js'

const appMenu = () => { 

    const state = store.get()

    const template = ({props, state}) => {

        const menuList = (menuList) => { 
            return menuList.map( menuItem => /*html*/`
                <li class="menu-item">
                    <a href="${menuItem.link}">${menuItem.label}</a>
                </li>
            `)
            .join('')
        }
        return /*html*/`
            <div class="wrapper-menu">
                <ul>
                    ${menuList(state.menuList)}
                </ul>
            </div>
        `
    }

    const hooks = ({state, methods}) => ({
        afterOnInit () {
            store.subscribe(methods.changeMenu)
        }
    })

    const events = ({on, queryAll, methods}) => ({

        onChangeList () {
            const li = queryAll('li')

            on('click', li, () => methods.changeMenu())
        }

    })

    const methods = ({props, state, elm}) => ({ 
        changeMenu (payload) {
            console.log(payload)
            if(!payload) return
            state.set({menuList: payload.menuList})

        }
    })

    return {
        state,
        template,
        events,
        hooks,
        methods
    }

}

export { appMenu }