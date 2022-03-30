import { createApp } from 'vue'
import App from './App.vue'
// 引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入封装的router
import router from './router/index'
// 引入gin-vue-admin前端初始化相关内容
import './core/vue-admin'
import run from '@/core/vue-admin.js'
// svg
import './icons'
import SvgIcon from '@/components/svgIcon/index.vue'

// element plus icon
// import * as ElIconModules from '@element-plus/icons-vue'

// import start from '@/micros'
// import { useQiankun } from './qiankun'


// for (const iconName in ElIconModules) {
//     app.component(iconName, ElIconModules[iconName])
//   }
   
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';
// // 注册子应用
const apps = [
  {
    name: 'qiankun-vue', // 应用的名字
    entry: "http://localhost:10001", // 默认会加载这个html，解析里面的js动态的执行（子应用必须支持跨域），fetch 这里省略了http: 
    container: '#vue', // 容器名
    activeRule: '/vue', // 激活的路径
    props: { a: 1 }
  },
  // {
  //   name: 'reactApp',
  //   entry: "//localhost:20000", // 默认会加载这个html，解析里面的js动态的执行（子应用必须支持跨域）
  //   container: '#react',
  //   activeRule: '/react'
  // }
]
registerMicroApps(apps); // 注册
// registerMicroApps([
//   {
//     name: 'vueApp', 
//     entry: 'http://localhost:10001',
//     container: '#vue',
//     activeRule: '/vue',         // 子应用触发规则（路径）
//   },
// ]);
// // 启动默认应用
// setDefaultMountApp('/vue')
// 开启服务
start()

const app = createApp(App)
app.use(run)
   .use(router)
   .use(ElementPlus)
   .component('svg-icon', SvgIcon)
   .mount('#app')
