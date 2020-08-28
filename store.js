import { observerFactory } from './lib/observer.js'

const store = observerFactory({
    menuList: [
        { label: 'Home', link: '#/' },
        { label: 'Produtos', link: '#/products' },
    ]
})

export { store }