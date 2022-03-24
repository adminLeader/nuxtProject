<template>
  <div>
    <!-- 头部导航 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>主页</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/editor">
              <i class="ion-compose"></i>&nbsp;发布文章
            </nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;设置
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" ui-sref-active="active" ui-sref="app.profile.main({ username: $ctrl.currentUser.username })" href="#/@dalong">
                <img class="user-pic" :src="user.image">
                {{user.username}}
              </a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login"> 登 录 </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register"> 注 册 </nuxt-link>
            </li>
          </template>
          
        </ul>
      </div>
    </nav>
    <!-- 子路由部分 -->
    <nuxt-child />
    <!-- 底部导航 -->
    <footer>
      <div class="container">
        <nuxt-link class="logo-font" to="/">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://kaiwu.lagou.com/">lagou</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "NuxtprojectIndex",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
  computed:{
    ...mapState(["user"])
  }
};
</script>

<style scoped>
</style>