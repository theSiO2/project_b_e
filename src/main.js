/* 
  该文件是整个项目的入口文件
*/
import 'font-awesome/css/font-awesome.min.css';//引入图标库
import Vue from 'vue'            //引入vue
import App from './App.vue'      //引入App（所有组件的父组件）
// import './registerServiceWorker'
import router from './router'    //引入Vue路由
import store from './store'      //引入store(VueX)
import Vuex from 'vuex'           //引入vueX
Vue.use(Vuex)                     //使用vuex
import '../node_modules/bootstrap/dist/css/bootstrap.min.css' //导入BootStrap的CSS部分
/* element ui全部引入 */
// import ElementUI from 'element-ui';             //引入element ui组件库
// import 'element-ui/lib/theme-chalk/index.css';  //引入element ui的CSS样式
import axios from './axios'
// axios.defaults.baseURL="10.126.27.100:8080"
/* element ui按需引入 */
import { Button, Select, Container, Aside, Header, Main, Menu, MenuItem,
         MenuItemGroup, Submenu, Row, Col, Pagination, Descriptions, Table,
         TableColumn, Card, Input, Popover, Link, ButtonGroup, Form, Option, 
         Dialog, FormItem, DatePicker, DescriptionsItem,Icon,Tabs,TabPane,
         InputNumber,Cascader,Result,Image} from 'element-ui'//element ui按需引入
Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Descriptions)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Input)
Vue.use(Popover)
Vue.use(Link)
Vue.use(ButtonGroup)
Vue.use(Form)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(DescriptionsItem)
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(InputNumber)
Vue.use(Cascader)
Vue.use(Result)
Vue.use(Image)
import { Message } from 'element-ui'
// Vue.use(Message)
Vue.prototype.$message = Message




Vue.config.productionTip = false  //关闭vue的生产提示
Vue.prototype.$axios = axios
/*创建vue实例对象*/

import less from 'less'
Vue.use(less)
new Vue({
  router,
  store,
  render: h => h(App) //将App组件放入容器中(箭头函数)
}).$mount('#app')
