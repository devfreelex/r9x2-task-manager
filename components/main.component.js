import { appHeader } from './appHeader.component.js'

const appMain = () => {

    const state = {}

    const children = () => ({
        appHeader
    })

    const template = ({state, props}) => {
        return /*html*/`
            <div class="app-main-wrapper">
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

    return {
        state,
        template,
        styles,
        children
    }
}

export { appMain }