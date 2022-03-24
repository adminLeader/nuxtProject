import axios from "axios"

//基本的请求路径
const request = axios.create({
    // baseURL:"https://conduit.productionready.io"
    baseURL:"http://realworld.api.fed.lagounews.com"
})
//请求拦截器

//响应拦截器
export default request