import { createApp } from 'vue'
import App from './App.vue'
// 引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入封装的router
import router from './router/index'
// vuex
import { store } from '@/store/index'
// 引入gin-vue-admin前端初始化相关内容
import './core/vue-admin'
import run from '@/core/vue-admin.js'
// svg
import './icons'
import SvgIcon from '@/components/svgIcon/index.vue'

// 引入qiankun
// import {useQiankun} from './qiankun'

// element plus icon
// import * as ElIconModules from '@element-plus/icons-vue'

import start from '@/micros'
// import { useQiankun } from './qiankun'


// for (const iconName in ElIconModules) {
//     app.component(iconName, ElIconModules[iconName])
//   }
   
//import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';
// // 注册子应用
// const apps = [
//   {
//     name: 'qiankun-vue', // 应用的名字
//     entry: "//localhost:10000", // 默认会加载这个html，解析里面的js动态的执行（子应用必须支持跨域），fetch 这里省略了http: 
//     container: '#vue', // 容器名
//     activeRule: '/vue', // 激活的路径
//     props: { a: 1 }
//   }
// ]
// registerMicroApps(apps); // 注册
// 开启服务
// start()

const app = createApp(App)
app.config.productionTip = false

app.use(run)
   .use(router)
   .use(ElementPlus)
   .use(store)
   .component('svg-icon', SvgIcon)
   .mount('#app')
export default app
start()
