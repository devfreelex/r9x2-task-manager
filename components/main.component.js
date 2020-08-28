import { store } from '../store.js'
import { appHeader } from './appHeader.component.js'

const appMain = () => {

    const state = store.get()

    const children = () => ({
        appHeader
    })

    const template = ({state, props}) => {
        return /*html*/`
            <div class="app-main-wrapper">
                <app-header></app-header>
                <app-header></app-header>
                <router-view></router-view>
            </div>
        `
    }

    const styles = () => {
        return /*css*/`
            h1 { color: red }
        `
    }

    const hooks = ({state}) => ({
        afterOnInit () {
            // setTimeout(() => {
            //     store.update((storeData) => {
            //         storeData.menuList = []
            //         return storeData
            //     })
            //     console.log('changed')
            // },3000)
        }
    })

    return {
        state,
        template,
        styles,
        hooks,
        children
    }
}

export { appMain }