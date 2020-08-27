const stateFactory = () => {
    const _state = {}
    const _listeners = []

    const _cloneState = (payload) => {
        if(!payload) return
        return JSON.parse(JSON.stringify(payload))
    }

    const _notify = () => {
        const data = _cloneState(_state)
        _listeners.forEach(listener => {
            listener(data)
        })
    }    

    const watch = (listener) => {
        _listeners.push(listener)
    }

    const merge = (payload) => {
        return Object.assign(_state, _cloneState(payload))
    }

    const set = (payload) => {
        merge(payload)
        _notify()
    }

    const get = () => {
        return _cloneState(_state)
    }


    return {
        watch,
        merge,
        set,
        get
    }
}

export { stateFactory }