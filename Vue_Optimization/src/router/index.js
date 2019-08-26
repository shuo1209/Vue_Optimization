import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)


let routers = [];

let getALLRouterMsg = (paths) => {
    paths.keys().forEach(
        (key) => routers.push(paths(key).default)
    )
}
getALLRouterMsg(require.context('.',true,/\.router\.js/))
export default new Router({
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home,
      children:[
       ...routers
      ]

    }
  ]
})
