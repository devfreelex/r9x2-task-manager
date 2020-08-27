const hooksFactory = () => {

    const beforeOnInit = () => {}

    const afterOnInit = () => {}

    const beforeOnRender = () => {}

    const afterOnRender = () => {}
    
    return {
        beforeOnInit,
        afterOnInit,
        beforeOnRender,
        afterOnRender
    }
}

export { hooksFactory }