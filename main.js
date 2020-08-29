import { r9x } from './lib/r9x.factory.js'
import { appMain } from './components/main.component.js'
import { appTasks } from './components/appTasks.component.js'
import { appNotFound } from './components/appNotFound.component.js'
import { appProducts } from './components/appProducts.component.js'
import { appCreate } from './components/appCreate.component.js'

const routerConfig = {
    firstRoute: { hash: '#/', component: appTasks },
    defaultRoute: { hash: '#/404', component: appNotFound },
    otherRoutes: [
        { hashExp: /^\#\/$/, component: appTasks },
        { hashExp: /^\#\/nova-task$/, component: appCreate }
    ]
}

const app = r9x()

app.use({
    main: appMain,
    routes: routerConfig
})

app.init()