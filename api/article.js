import request from "../utils/request";

//获取公共文章列表
export const getArticles = (params)=>{
    return request({
        method:"GET",
        url:"/api/articles",
        params
    })
}

// 获取关注文章列表
export const getFeedArticles = (params)=>{
    return request({
        method:"GET",
        url:"/api/articles/feed",
        headers:{
            Authorization:`Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMzNGNhM2QxOWFmYjNhYmI3OTc4YSIsInVzZXJuYW1lIjoiMTg4NTEwNTY1OTciLCJleHAiOjE2NTI3MDcwMTgsImlhdCI6MTY0NzUyMzAxOH0.7hCIzl0nHE33LBtkrtPvCVJ8JlB4nl20sfNSWoVJ3jk`
        },
        params
    })
}