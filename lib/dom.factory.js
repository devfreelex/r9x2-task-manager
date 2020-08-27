const domFactory = () => {
    let _context = null

    const setContext = (context) => _context = context

    const on = (eventName, elements, handler) => {
        const prop = `on${eventName}`
        elements.forEach( element => element[`${prop}`] = handler)
    }

    const query = (selector) => _context.querySelector(selector)

    const queryAll = (selector) => Array.from(_context.querySelectorAll(selector))

    const bindEventListeners = (handlers) => { 
        const keys = Object.keys(handlers)
        keys.forEach( key => handlers[key]())
    }

    const bindStyles = (tagName, styles) => { 
        if(!styles || !tagName) return 
        const styleExists = document.querySelector(`style#${tagName}`) ? true : false

        if(styleExists) return

        const styleElement = document.createElement('style')
        styleElement.setAttribute('id', tagName)
        styleElement.textContent = styles
        document.head.insertAdjacentElement('beforeend', styleElement)
    }

    return {
        bindEventListeners,
        bindStyles,
        setContext,
        queryAll,
        query,
        on
    }
}

export {domFactory}