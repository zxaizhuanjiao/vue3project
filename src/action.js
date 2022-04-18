// 此action文件为定义微应用之间全局状态
// 引入qiankun的应用间通信方法initGlobalState
import { initGlobalState } from 'qiankun'
// import { useStore } from "vuex";
import { store } from './store/index'
// const store = useStore()

const initialState = {
    // 这里可以写初始化数据
    menu: [],
    token: store.state.user.token,
    userInfo: store.state.user.userInfo
}

const actions = initGlobalState(initialState)

// 监听actions全局公共状态数据的变化
actions.onGlobalStateChange((state, preState) => {
    console.log('主应用变更前：', preState)
    console.log('主应用变更后：', state)
    localStorage.setItem('newMenu', JSON.stringify(state.menu))
    // store.commit('newMenu/setMenu', state)
})
export default actions