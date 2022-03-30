console.log(process.env);
const apps = [  
  {    
    name: 'vueApp', 
    entry: '//localhost:10001',
    container: '#vue',
    activeRule: '/vue',
    sandbox: {
      strictStyleIsolation: true // 开启样式隔离
    }
  },
];
export default apps;
