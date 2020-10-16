<template>
<body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">我的青春要留下记忆</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>

    <el-form-item>
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button
        type="primary"
        style="width: 100%;background: #505458;border: none"
        v-on:click="login"
      >登录</el-button>
    </el-form-item>
    <router-link class="toRegister" to="/Register">
      <div class="header-right">没有账号？去注册</div>
    </router-link>
  </el-form>
</body>
</template>
 
 
<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        base_api:""
      },
      responseResult: []
    };
  },
  mounted(){
    this.base_api = process.env.VUE_APP_BASE_API
  },
  methods: {
    login() {
      this.axios
        .post(this.base_api+"/lifespace/login", {
          userName: this.loginForm.username,
          passWord: this.loginForm.password
        })
        .then(successResponse => {
          console.log(successResponse);
          if (successResponse.data.code=='200') {
            window.localStorage.setItem("touxiang", successResponse.data.touxiang);
            window.localStorage.setItem("token", successResponse.data.token);
            window.localStorage.setItem(
              "username",
              successResponse.data.username
            );
            window.localStorage.setItem(
              "account",
              successResponse.data.account
            );
            this.$router.replace({ path: "/Chat" });
          } else if (successResponse.data.code=='500') {
            this.$message({
              message: "账号或密码错误",
              type: "error"
            });
            this.$router.replace({ path: "/" });
          }
        })
        .catch(failResponse => {});
    }
  },
  created() {
    // var isLogin = this.$getMyConfig.getConfig();
    // if (isLogin === 1) {
    //   this.$router.replace({ path: "/HelloWorld" });
    // } else {
    //   this.$router.replace({ path: "/" });
    // }
  }
};
</script>
 
<style scoped>
.toRegister {
  text-decoration: none;
  font-size: 15px;
  color: #505458;
}
#poster {
  background:url("../assets/timg.jpg") no-repeat;
  /* background-color: lightgray; */
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
  padding: 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>