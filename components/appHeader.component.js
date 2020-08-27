const appHeader = () => {
    const state = {
        title: 'appHeader'
    }

    const template = ({state, props}) => {
        return /*html*/`
            <div class="header-wrapper">
                <h1>${state.title}</h1>
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
                box-sizing: border-box
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
    }
}

export { appHeader }