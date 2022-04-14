import actions from '../action'
const apps = [  
  // {    
  //   name: 'qiankun-vue', 
  //   entry: '//localhost:10000',
  //   container: '#vue',
  //   activeRule: '/vue',
  //   sandbox: {
  //     strictStyleIsolation: true // 开启样式隔离
  //   },

  // },
  {    
    name: 'audit', 
    // entry: '//localhost:8083',
    entry: process.env.NODE_ENV === 'production' ? '//10.25.17.195:8083' : '//localhost:8083',
    container: '#audit',
    activeRule: '/audit',
    sandbox: {
      strictStyleIsolation: true // 开启样式隔离
    },
    props: {
      actions,
      // msg: 'w',
      // routerBase: '/audit' // 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
    },
  },
];
export default apps;
