import { store } from '../store'

const appMenu = () => { 

    const tagName = 'app-menu'

    const state = store.get()

    const template = ({props, state}) => {

        const menuList = (menuList) => { 
            return menuList.map( menuItem => /*html*/`
                <li class="menu-item">
                    <a class="menu-link" href="${menuItem.link}">${menuItem.label}</a>
                </li>
            `)
            .join('')
        }
        return /*html*/`
            <div class="menu-wrapper">
                <ul class="menu-list">
                    ${menuList(state.menuList)}
                </ul>
            </div>
        `
    }

    const styles = () => {
        return /**/`
           app-header .menu-wrapper,
           app-header .menu-list,
           app-header .menu-link {
                display:block;
                float:left;
                width:100%;
            }

           app-header .menu-item {
                display:block;
                float:left;
            }

            app-header .menu-link {
                padding:5px;
                color: #fff;
                text-transform: uppercase;
                font-size: .775em;
                text-decoration: none;
            }
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
            if(!payload) return
            state.set({menuList: payload.menuList})

        }
    })

    return {
        tagName,
        state,
        template,
        styles,
        events,
        hooks,
        methods
    }

}

export { appMenu }