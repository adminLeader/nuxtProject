//让cookieparser 第三方插件只能够在服务端中加载
const cookieparser = process.server ? require('cookieparser') : undefined

//服务端在渲染期间运行的都是相同的示例，为了避免数据冲突，state必须是函数
export const state = ()=>{
    return {
        //为当前用户的登录状态
        user:null
    }
}

export const mutations = {
    //修改state中user的状态
    setUser(state,data){
        state.user = data
    }
}

export const actions = {
    //nuxtServerInit 是nuxt 内置方法
    //nuxtServerInit 这个 action 会在服务端渲染期间自动调用
    //作用:初始化 数据仓库，将数据传递给客户端使用
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setUser', user)
      }
}