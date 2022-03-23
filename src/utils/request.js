import axios from 'axios';
 
let baseURL = 'xxx';//填自己的baseURL
// let baseURL = 'http://localhost:8004';
//使用自定义配置新建一个 axios 实例
//baseURL 基本url
//timeout 设置网络超时 设置了在5000毫秒内请求数据 如果没有请求成功就执行错误函数
 
const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,  // 请求超时时间
    //Content-Type（内容类型） Content-Type 标头告诉客户端实际返回的内容的内容类型。
    headers: {'content-type': 'application/json'} //设置请求头请求格式为JSON
});
//axios提供了拦截器，用于加载我们在发送每次请求或者得到响应后，进行对应的处理。
// 请求拦截器（在请求之前进行一些配置） 请求拦截 interceptors.request.use（）
// 请求拦截的作用：
// 比如config中的一些信息不符合服务器的要求，得及时拦截下来更改。
// 比如每次发送网络请求的时候，都希望在界面中显示一个动态加载的请求图标，就是一直在转圈圈，让用户知道当前页面正在加载数据，准备渲染视图。
// 比如某些网络请求（比如登录token）,必须携带一些特殊的信息。
// axios.interceptors.request.use(function(config){
// 	//比如是否需要设置 token
// 	config.headers.token='wwwwwsdsdf'
// 	return config
// })
instance.interceptors.request.use(config => {
    //startsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“开头”的，根据判断结果返回 true 或 false。
    // console.log(config)
    //登录认证是Basic模式，登录之后的接口全是Bearer模式。所以要在拦截器里判断请求路径是不是登录接口再拼接这个认证模式
    if (config.url.startsWith('/oauth/token')) {//判断地址是否为/oauth/token
        //如果rul开头路径为'/oauth/token' 判断为登录接口 
        config.headers.Authorization = 'Basic d2ViQXBwOndlYkFwcA==' //固定Basic d2ViQXBwOndlYkFwcA==
        //如果不是登录接口 则拼接Bearer模式
        // 判断是否存在token，如果存在的话，则每个http header都加上token
    } else if (sessionStorage.getItem('token')) {   //读取数据语法：var name = sessionStorage.getItem("key");
        config.headers.Authorization = 'bearer ' +  sessionStorage.getItem('token')
    }
    return config;
})
//响应了拦截器（在响应之后对数据进行一些处理） 响应拦截 interceptors.response.use()
//比如响应一些报错信息
instance.interceptors.response.use(response => {
    const result = response.data;
    // console.log(response.data)
    if (response.config.url.startsWith('/oauth/token')) { //判断是否为登录接口
        return  result; //返回接口相关数据
    } else if (result.status === 'SUCCESS') { // 不为登录则判断status
        return  result.data; //返回对应接口数据
    } else {
        //Promise.reject()方法返回一个带有拒绝原因的Promise对象。
        return Promise.reject(result.error);
    }
 
 
}, error => {
    return Promise.reject(error);
});
 
 