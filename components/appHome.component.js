const appHome = () => {

    const state = {
        title: 'Home'
    }

    const template = ({state, props}) => {
        return /*html*/`
            <div class="home-wrapper">
                <h1 class="title">${state.title}</h1>
            </div>
        `
    }

    const styles = () => {
        return /*css*/`
            app-home .title { color: blue }
        `
    }


    return {
        state,
        template,
        styles
    }
}

export { appHome }