import { r9x } from 'r9x_js'
import { appMain } from './components/main.component'
import { appTasks } from './components/appTasks.component'
import { appNotFound } from './components/appNotFound.component'
import { appCreate } from './components/appCreate.component'

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