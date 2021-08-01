import { createApp, h } from 'vue'
// @ts-ignore
import App from './pages/App.vue'
// @ts-ignore
import About from './pages/Index.vue'


const NotFoundComponent = { template: '<p>Page not found</p>' }


const AboutComponent = About


const routes: {[key: string] : any} = {
    '/': App,
    '/about': AboutComponent
}

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
