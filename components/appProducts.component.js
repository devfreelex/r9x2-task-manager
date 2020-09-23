const appProducts = () => {

    const tagName = 'app-products'

    const state = {
        title: 'Products'
    }

    const template = ({ state, props }) => {
        return /*html*/`
            <div class="products-wrapper">
                <h1>${state.title}</h1>
            </div>
        `
    }

    const styles = () => {
        return /*css*/`
            app-products h1 { color: green }
        `
    }

    const events = ({query, queryAll, on, methods}) => ({
        onChangeTitle () {
            const titleElement = query('h1')
            on('click', [titleElement], () => methods.changeTitle())
        }
    })

    const methods = ({state, props}) => ({

        changeTitle () {
            state.set({title: 'Vitrine de produtos'})
        }
    })


    return { tagName, state, template, styles, events, methods }
}

export { appProducts }