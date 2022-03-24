export default {
    plugins: [{ src: '~/plugins/underscore', ssr: false }],
    server:{
        "port":"3030",
        "host":"0.0.0.0"
    },
    router: {
        linkActiveClass:"active",//修改路由选中的高亮类名
        extendRoutes(routes, resolve) {
            
            // 清除nuxt.js 基于pages目录生成的路由表规则
            routes.splice(0) //routes是所有的路由表信息
            routes.push(...[
                {
                    path:"/",
                    component:resolve(__dirname,"pages/layout/"),
                    children:[
                        {
                            path:"",//默认子路由
                            name:"index",
                            component:resolve(__dirname,"pages/home/")
                        },
                        {
                            path:"/login",
                            name:"login",
                            component:resolve(__dirname,"pages/login/")
                        },
                        {
                            path:"/register",
                            name:"register",
                            component:resolve(__dirname,"pages/login/")
                        },
                        {
                            path:"/profile/:usernanme",
                            name:"userProfile",
                            component:resolve(__dirname,"pages/profile/")
                        },
                        {
                            path:"/settings",
                            name:"settingIndex",
                            component:resolve(__dirname,"pages/settings/")
                        },
                        {
                            path:"/article/:slug",
                            name:"articleIndex",
                            component:resolve(__dirname,"pages/article/")
                        },
                        {
                            path:"/editor",
                            name:"editor",
                            component:resolve(__dirname,"pages/editor/")
                        },
                    ],

                }
            ])
        }
    }
}