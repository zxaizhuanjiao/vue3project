// index.js
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import {  
  registerMicroApps,  
  addGlobalUncaughtErrorHandler,  
  start,
} from "qiankun";// 微应用注册信息

import apps from "./app";
 
registerMicroApps(apps, {  
  beforeLoad: [
    app => {
        console.log("before load", app.name);
        return Promise.resolve();
    },
  ],
  beforeMount: [
    app => {
        console.log("before mount", app.name);
        return Promise.resolve();
    },
  ],
  afterUnmount: [
    app => {
        console.log("after mount", app.name);
        return Promise.resolve();
    },
  ],
});
 
//主项目与子项目交互用的参数，子项目与主项目都可以修改此参数
// const actions = initGlobalState(state);
// actions.setGlobalState({
//     globalToken: ''
// })
// addGlobalUncaughtErrorHandler((event) => {
//     console.log(event);
//     const {
//         msg
//     } = event;
//     if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
//         console.log('微应用加载失败，请检查应用是否可运行');
//     }
// });

export default start;
// export {
//     actions
// }
// addGlobalUncaughtErrorHandler((event) => {  
//   console.error(event);  
//   const { message: msg } = event  
//   if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {    
//   console.error("微应用加载失败，请检查应用是否可运行");  
//   }
// });
// export default start;