
import { createRouter,createWebHashHistory} from "vue-router";
import form from "@/router/form";


const routes = [
  {
    path: '/',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/Index.vue'),
    children: [
      form,
    ]
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes: routes
})
