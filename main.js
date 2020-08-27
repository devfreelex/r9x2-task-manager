import { r9x } from './lib/r9x.factory.js'
import { appMain } from './components/main.component.js'
import { appHome } from './components/appHome.component.js'
import { appNotFound } from './components/appNotFound.component.js'
import { appProducts } from './components/appProducts.component.js'

const routerConfig = {
    firstRoute: { hash: '#/', component: appHome },
    defaultRoute: { hash: '#/404', component: appNotFound },
    otherRoutes: [
        { hashExp: /^\#\/$/, component: appHome },
        { hashExp: /^\#\/products$/, component: appProducts }
    ]
}

const app = r9x()

app.use({
    main: appMain,
    routes: routerConfig
})

app.init()