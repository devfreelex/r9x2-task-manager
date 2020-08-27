const appNotFound = () => {

    const state = {
        title: 'NotFound'
    }

    const template = ({state, props}) => {
        return /*html*/`
            <div class="not-found-wrapper">
                <h1>${state.title}</h1>
            </div>
        `
    }

    const styles = () => {
        return /*css*/`
            app-not-found h1 { color: red }
        `
    }


    return { state, template, styles }
}

export { appNotFound }