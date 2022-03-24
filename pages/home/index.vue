<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link class="nav-link" 
                          :class=" {active : tab==='your_feed'}"
                          exact
                          :to="{name:'index',query:{tab:'your_feed'}}">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" 
                          :class=" {active : tab==='global_feed'}"
                          exact
                          :to="{name:'index',query:{tab:'global_feed'}}">Global Feed</nuxt-link>
                
              </li>
              <li class="nav-item" v-if="$route.query.tag">
                <nuxt-link class="nav-link" 
                          :class=" {active : tab==='tabName'}"
                          exact
                          :to="{name:'index',query:{tab:'tabName',tag:$route.query.tag}}">#{{$route.query.tag}}</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link :to="{
                name:'userProfile',
                params:{
                  usernanme:article.author.username
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                name:'userProfile',
                params:{
                  usernanme:article.author.username
                }
              }" class="author">{{article.author.username}}</nuxt-link>
                <span class="date">{{article.createdAt}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{activeButton:article.favorited}">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link class="preview-link"
                  :to="{
                    name:'articleIndex',
                    params:{
                      slug:article.slug
                    }
                  }"
            >
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- 分页器 -->
          <div class="pagination">
            <span v-for="item in totalPageCount" :key="item" :class="{choosePage:item===page}">
              <nuxt-link :to="{name:'index',query:{page:item,tag:$route.query.tag,tab:tab}}">{{item}}</nuxt-link>
            </span>
          </div>
          <!-- /分页器 -->
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link :to="{name:'index',query:{tag:item,tab:'tabName'}}" 
                      class="tag-pill tag-default" 
                          v-for="item in tags" 
                          :key="item">
                  {{item}}
              </nuxt-link>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getArticles,getFeedArticles} from "@/api/article"
import {getTags} from "@/api/tag"
import { mapState } from "vuex"
export default {
  watchQuery:["page","tag","tab"],
  name: "index",
  async asyncData({query,store}){//asyncData() 方法有利于seo的
    let page = Number.parseInt(query.page) || 1
    let limit = 20
    // const {data} = await 
    // const {data:TagData} = await 
    // const { tag } = query
    const loadArticles = store.state.user && query.tab==="your_feed"?getFeedArticles:getArticles
    const [ articleRes, tagRes] = await Promise.all([
      loadArticles({//获取文章列表
        limit,
        // offset 为借口提供的 展示第几条数据 1 表示跳过第一条 展示第二条
        offset:(page -1) * limit, //当前页内展示对应的数据
        tag:query.tag
      }),
      getTags()//获取标签列表
    ])
    // console.log(query);
    const {articles,articlesCount} = articleRes.data
    const {tags} = tagRes.data
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tab:query.tab || "global_feed"
    }
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
  computed:{
    ...mapState(["user"]),
    totalPageCount(){ //分页码的个数
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
};
</script>

<style scoped>
.activeButton{
    color: #fff;
    background-color: #5CB85C;
    border-color: #5CB85C;
}
.pagination{
  width: 100%;
  text-align: center;
}
.pagination>span{
  display: inline-block;
  vertical-align: middle;
  border:1px solid lightgray;
  width:30px;
  height:30px;
  text-align: center;
  line-height:30px;
  color: #5CB85C;
  cursor: pointer;
  border-radius:5px;
  margin-right:4px;
}
.pagination>.choosePage{
  background:#5CB85C;
  color:white;
}
.pagination>.choosePage>a{
  display: block;
  width:100%;
  height:100%;
  color:white !important;
}
</style>