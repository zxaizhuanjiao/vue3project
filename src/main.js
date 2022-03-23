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

const app = createApp(App)
// for (const iconName in ElIconModules) {
//     app.component(iconName, ElIconModules[iconName])
//   }

app.use(run)
   .use(router)
   .use(ElementPlus)
   .component('svg-icon', SvgIcon)
   .mount('#app')
   
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';
// // 注册子应用
registerMicroApps([
  {
    name: 'vue app', 
    entry: '//localhost:8081',
    container: '#container',
    activeRule: '/vue',         // 子应用触发规则（路径）
  },
]);
// 启动默认应用
setDefaultMountApp('/vue')
// 开启服务
start()
