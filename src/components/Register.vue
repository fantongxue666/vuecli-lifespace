<template>
<body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">系统注册</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="起一个昵称吧？"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>

    <el-form-item>
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <div style="float:left;height:100px;width:80px;line-height:100px;text-align:center;margin-bottom:20px;font-size:13px;color:gray;">上传头像</div>
    <el-upload 
      class="avatar-uploader"
      action="/api/lifespace/uploadImage"
      name="file"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="'http://fdfs.tiger2.cn/'+imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    

    <el-form-item style="width: 100%">
      <el-button
        type="primary"
        style="width: 100%;background: #505458;border: none"
        v-on:click="register"
      >注册</el-button>
    </el-form-item>
    <router-link class="toRegister" to="/">
      <div class="header-right">已注册？去登录</div>
    </router-link>
  </el-form>
</body>
</template>
 
 
<script>
export default {
  name: "Register",
  data() {
    return {
      imageUrl: "",
      loginForm: {
        username:"",
        account: "",
        password: "",
        checkPass: "",
      },
      responseResult: []
    };
  },
  methods: {
    register(){
      const username=this.loginForm.username;
      const account=this.loginForm.account;
      const password=this.loginForm.password;
      const imageUrl=this.imageUrl;
       // axios请求开始
        var token = window.localStorage.getItem("token");
        this.axios.defaults.headers.common["token"] = token;
        this.axios
          .post("/api/lifespace/register", {
            user: window.localStorage.getItem("account"),
             username:this.loginForm.username,
             account:this.loginForm.account,
             password:this.loginForm.password,
             imageUrl:this.imageUrl
          })
          .then(response => {
            var code = response.data.errorCode;
            if (code == "101") {
              this.$alert("token失效，请重新登录", "警告", {
                confirmButtonText: "确定",
                callback: action => {
                  this.$router.replace({ path: "/" });
                }
              });
            } else {
              console.log(response.data);
              if (response.data == 1) {
                this.$message({
                  message: "发送成功",
                  type: "success"
                });
                this.$router.go(-1);
              }
            }
          })
          .catch(function(error) {
            this.$message.error("服务器发生故障");
          });
        // axios请求结束
    },
   uploadSuccess(response, file, fileList) {
      const array = response;
      this.imageUrl=array.url;
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {}
};
</script>
 
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.toRegister {
  text-decoration: none;
  font-size: 15px;
  color: #505458;
}
#poster {
  /* background:url("../assets/eva.jpg") no-repeat; */
  background-color: lightgray;
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