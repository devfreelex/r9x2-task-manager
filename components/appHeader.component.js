import { appMenu } from './appMenu.component'

const appHeader = () => {
    const state = {
        title: 'appHeader',
        menus: [
            {
                menu: [
                    {label: 'Home 1', link:'#/'},
                    {label: 'Produtos 1', link:'#/products'},
                    {label: 'Não existe 1', link:'#/nao-existe'},
                ]
            }
        ]
    }

    const children = () => ({
        appMenu
    })

    const template = ({state, props}) => {
        return /*html*/`
            <div class="header-wrapper">
                <app-menu></app-menu>
            </div>
        `
    }

    const styles = () => { 
        return /*css*/`

            app-header .header-wrapper {
                display:block;
                float:left;
                width:100%;
                padding:15px;
                border:1px #ebebeb solid;
                box-sizing: border-box;
                background:blue;
            }

           app-header h1 { 
               color: blue; 
               font-size:15px
            }
        `
    }

    return {
        state,
        template,
        styles,
        children
    }
}

export { appHeader }