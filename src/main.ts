import { createApp, h } from 'vue'
import App from '@/pages/App.vue'

import router from './router'


const NotFoundComponent = { template: '<p>Page not found</p>' }


const SimpleRouterApp: any = {

    data: () => ({
        currentRoute: window.location.pathname
    }),

    computed: {
        CurrentComponent(): any {
            // @ts-ignore
            return router[this.currentRoute] || NotFoundComponent
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

createApp(App).use(router).mount('#app')
