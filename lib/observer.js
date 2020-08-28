const observerFactory = (observable) => {
    let _observerList = []

    const _emitError = (msg) => {
        console.warn(msg)
    }

    const subscribe = (observer) => {
        if (typeof observer !== 'function') throw new Error('The provided observer is not a function and must be.')
        const observerExists = _observerList.some( listener => listener.name === observer.name)
        !observerExists ? _observerList.push(observer) : _emitError('Another observer with the same name has already been registered.')
        return observer
    }

    const unsubscribe = (observer) => {
        _observerList = _observerList.filter( observerItem => observerItem !== observer)
    }

    const notify = (data) => {
        _observerList.forEach( observer => observer(data))
    }

    const update = (mutator) => {
        const newObservable = mutator(observable)
        notify(newObservable)
    }

    const logger = () => console.log(_observerList)

    const get = () => observable

    return { subscribe, unsubscribe, update, get, logger }
}

export { observerFactory }