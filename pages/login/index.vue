<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "登录" : "注册" }}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register" v-if="isLogin"
              >没有账号，注册账号？</nuxt-link
            >
            <nuxt-link to="/" v-else>已有账号，直接登录</nuxt-link>
          </p>

          <ul class="error-messages">
            <!-- 遍历错误信息对象  -->
            <template v-for="(errVal, msgName) in errMsg">
              <li :key="val" v-for="val in errVal">{{ msgName }} {{ val }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="请输入您的账号"
                v-if="!isLogin"
                required
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="user.email"
                required
                placeholder="请输入您的邮箱"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                required
                placeholder="请输入您的密码"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "登录" : "注册" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
//仅在客户端加载js-cookie 第三方包
const Cookie = process.client ? require("js-cookie") : undefined
export default {
  name: "LoginIndex",

  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errMsg: {}, //存储错误信息
    };
  },
  computed: {
    isLogin() {
      //查看当前路由的名字是否是login
      return this.$route.name === "login";
    },
  },
  mounted() {},

  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin
          ? await login({
              user: this.user,
            })
          : await register({
              user: this.user,
            });
        console.log(data.user);
        // 保存登录状态 处理token
        this.$store.commit("setUser",data.user) //将用户的信息全部的都存入到store仓库中
        //将用户信息持久化（防止页面刷新用户登录信息消失）
        data.user = JSON.stringify(data.user)
        Cookie.set("user",data.user)

        this.$router.push("/");
      } catch (error) {
        this.errMsg = error.response.data.errors;
        console.log(this.errMsg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>