import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../pages/Main.vue"//引入主页
import messageItem from "../components/messageItem"
import Job from "../components/post/Job.vue"
import MenuMenager from "../components/MenuMenagement/MenuMenager.vue"
import Test from "../components/MenuMenagement/test.vue"
import MenuAdd from "../components/MenuMenagement/MenuAdd.vue"
import Company from "../components/company/Company.vue"
import CompanyAddUpdate from "../components/company/Company-add-or-update.vue"
import Jobadd from "../components/post/Job-add.vue"
import Success from "../components/post/success.vue"
import Rentalinfo from "../components/Rent/RentalInfo.vue"
import RentalCheck from "../components/Rent/RentalInfo.vue"
import RentalSearch from "../components/Rent/RentalSearch.vue"
Vue.use(VueRouter)

const routes =
  [
    //主页路由配置
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [ //通过children配置子级路由
        {
          path: 'Rentalinfo',
          component: Rentalinfo,
        },
        {
          path: 'job', //此处一定不要写：/news
          component: Job,
        },
        {
          path: 'issue',
          component: Jobadd,
        },
        {
          path: 'success',
          component: Success,
        },
        {
          path: 'menu', //此处一定不要写：/news
          component: MenuMenager,
          children: [
            {
              path: 'MenuAdd', //此处一定不要写：/news
              component: MenuAdd,
            }
          ]
        },
        {
          path: 'Company',
          component: Company
        },
        {
          path:'CompanyAddUpdate',
          component:CompanyAddUpdate
        },
        {
          path:'RentalCheck',
          component:RentalCheck
        },
      ]
    },
    // {
    //   path: '/job1',
    //   component: messageItem
    // },
    // {
    //   path: '/test',
    //   component: Test
    // },
    // {
    //   path: 'MenuAdd', //此处一定不要写：/news
    //   component: MenuAdd,
    // },

  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
