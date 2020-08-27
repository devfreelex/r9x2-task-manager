import { domFactory } from './dom.factory.js'
import { stateFactory } from './stateFactory.js'

const componentFactory = () => {

    const _createTagName = (text) => {
        return text.replace(/([A-Z]+|[A-Z]?[a-z]+)(?=[A-Z]|\b)/g, '-$&').slice(1).toLowerCase()
    }

    const _createState = (schema) => {
        const stateManager = stateFactory()
        stateManager.merge(schema.state)
        const { set, get, watch } = stateManager
        return { set, get, watch }
    }

    const _getProps = (element) => { 
        if(!element.dataset || !element.dataset.props) return {}
        return JSON.parse(element.dataset.props.replace(/\'/g, '"'))
    }

    const _createProps = (schema, element) => {
        const stateManager = stateFactory()
        const props = _getProps(element)
        stateManager.merge(props)
        const { set, get, watch } = stateManager
        return { set, get, watch }
    }

    const _createEvents = (schema, methods, target) => {
        if(!schema || !schema.events || typeof schema.events !== 'function') return {}
        const _domManger = domFactory()
        _domManger.setContext(target)

        return schema.events({
            on: _domManger.on,
            query: _domManger.query,
            queryAll: _domManger.queryAll,
            methods
        })
    }

    const _createChildren = (schema) => {
        if(schema && schema.children && typeof schema.children === 'function') return schema.children()
        return {}
    }

    const _createHooks = (schema, state, props, methods) => {
        if(!schema || !schema.hooks || typeof schema.hooks !== 'functon') return null
        return schema.hooks({
            state,
            props,
            methods,
        })
    }

    const _createMethods = (schema, state, props) => {
        if(!schema || !schema.methods || typeof schema.methods !== 'function') return {}
        return schema.methods({ state, props })
    }

    const _createStyles = (styles) => {
        if(!styles || typeof styles !== 'function') return ''
        return styles()
    }

    const _updateView = (config) => {

        const { tagName, element, template, events, props, state, hooks, styles} = config
        const dataProps = props.get ? props.get() : props
        const dataModel = state.get ? state.get() : state
        const _domManger = domFactory()
        
        element.dataset.props = JSON.stringify(dataProps).replace(/\"/g, "'")

        hooks?.beforeOnRender()

        element.innerHTML = template({ 
            props: dataProps,
            state: dataModel
        })

        _domManger.setContext(element)
        _domManger.bindEventListeners(events)
        _domManger.bindStyles(tagName, _createStyles(styles))

        hooks?.afterOnRender()

        if(_hasChildren(config)) _renderChildren(config)
    }

    const _renderChildren = (component) => {
        if(!component || !component.children) return
        const childrenKeys = Object.keys(component.children)
        childrenKeys.forEach( childKey => {
            render(component.children[childKey], [component.element])
        })
    }

    const _hasChildren = (component) => {
        if(!component.hasOwnProperty('children')) return false
        if(!Object.keys(component.children).length) return false
        return true
    }

    const render = (factory, contexts, newState) => { 
        
        contexts.forEach(context => {
            const tagName = _createTagName(factory.name)
            const targets = Array.from(context.querySelectorAll(tagName))
            targets.forEach(target => { 
                const component = create(factory, target, context)
                component.state = newState || component.state.get()
                component?.hooks?.beforeOnInit()
                _updateView(component)
                component?.hooks?.afterOnInit()
                if(_hasChildren(component)) _renderChildren(component)
            })
        })

    }

    const create = (factory, target, parent) => { 
        const schema = factory()
        const appName = factory.name
        const tagName = _createTagName(factory.name)
        const element = target
        const state = _createState(schema)
        const props = _createProps(schema, element)
        const methods = _createMethods(schema, state, props)
        const events = _createEvents(schema, methods, target)
        const hooks = _createHooks(schema, state, props, methods)
        const children = _createChildren(schema)

        const component = {...schema, appName, state, props, tagName, element, children, methods, events, hooks }

        state.watch((newState) => {
            Object.assign(component.state, newState)
            _updateView(component)
        })

        props.watch((newState) => {
            Object.assign(component.props, newState)
            _updateView(component)
        })

        return component
    }

    return {
        create,
        render,
    }
}


export { componentFactory }