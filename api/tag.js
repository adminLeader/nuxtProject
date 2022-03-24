import request from "../utils/request";

export const getTags = ()=>{//获取文章的标签列表
    return request({
        method:"GET",
        url:"/api/tags",
    })
}