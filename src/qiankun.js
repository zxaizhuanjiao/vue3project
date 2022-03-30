import {
    registerMicroApps,
    start
} from 'qiankun'

export const useQiankun = () =>{
    const apps = [
        {
            name: 'qiankun-vue', // 应用的名字
            entry: "//localhost:10000", // 默认会加载这个html，解析里面的js动态的执行（子应用必须支持跨域），fetch 这里省略了http: 
            container: '#vue', // 容器名
            activeRule: '/vue', // 激活的路径
            props: { a: 1 }
        }
    ]
    registerMicroApps(apps, {
        beforeLoad: [
            app => {
                console.log(`${app.name}的beforeLoad阶段`)
            }
        ],
        beforeMount: [
            app => {
                console.log(`${app.name}的beforeMount阶段`)
            }
        ],
        afterMount: [
            app => {
                console.log(`${app.name}的afterMount阶段`)
            }
        ],
        beforeUnmount: [
            app => {
                console.log(`${app.name}的beforeUnmount阶段`)
            }
        ],
        afterUnmount: [
            app => {
                console.log(`${app.name}的afterUnmount阶段`)
            }
        ]
    })

    start({ experimentalStyleIsolation: true, prefetch: 'all' })
}