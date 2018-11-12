import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/Goods'
import Ratings from '../components/ratings/Ratings'
import Seller from '../components/seller/Seller'

Vue.use(Router)

let router = new Router({
	mode:'history',
	linkActiveClass:"active",
  routes: [
    {
      path: '/',
      redirect:"/goods"
    },
		{
			path: '/goods',
			name: 'Goods',
			component: Goods
		},
		{
			path: '/ratings',
			name: 'Ratings',
			component: Ratings
		},
		{
			path: '/seller',
			name: 'Seller',
			component: Seller
		}
  ]
})

export default router