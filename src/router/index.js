import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '../components/Nav'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'nav',
      component: Nav,
      children: [
        {//商品
          path: '/',
          name: 'Commodity',
          component: () => import('../pages/Commodity'),
        },
        {//评论
          path: '/comment',
          name: 'Comment',
          component: () => import('../pages/Comment')
        },
        {//商家
          path: '/merchant',
          name: 'Merchant',
          component: () => import('../pages/Merchant')
        }
      ]
    },
    {
      path:'/activemsg',
      name:'activemsg',
      component:() => import( '../pages/Activemsg' )
    }

  ]
})


