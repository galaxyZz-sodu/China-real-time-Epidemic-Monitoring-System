import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/'
import CovArea from '../views/CovArea'
import Prevention from '@/views/Prevention'
import Citys from '@/views/Citys'
import Travel from '@/views/Travel'
import SearchCity from '@/views/SearchCity'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/area',
        name: 'Area',
        component: CovArea
    },
    {
        path: '/prevention',
        name: 'Prevention',
        component: Prevention
    },
    {
        path: '/citys/:cityname',
        name: 'Citys',
        component: Citys,
        props: true
    },
    {
        path: '/travel',
        name: 'Travel',
        component: Travel
    },
    {
        path: '/searchCity',
        name: 'SearchCity',
        component: SearchCity
    }
]

const router = new VueRouter({
    routes
})

export default router