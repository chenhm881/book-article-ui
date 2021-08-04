import { createApp, h } from 'vue'

import {routes} from './router/index'


const NotFoundComponent = { template: '<p>Page not found</p>' }


const SimpleRouterApp: any = {

    data: () => ({
        currentRoute: window.location.pathname
    }),

    computed: {
        CurrentComponent(): any {
            // @ts-ignore
            return routes[this.currentRoute] || NotFoundComponent
        }
    },

    render(): any {
        return h(this.CurrentComponent)
    },

    created () {
        window.addEventListener('popstate', () => {
            this.currentRoute = window.location.pathname
        })
    }
}

export default SimpleRouterApp;


createApp(SimpleRouterApp).mount('#app')
