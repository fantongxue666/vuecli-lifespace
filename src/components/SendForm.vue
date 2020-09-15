<template>
  <div style="width:60%;margin:auto;padding-top:50px;">
    <el-form label-width="80px">
      <el-form-item label="发表内容">
        <el-input type="textarea" v-model="content"></el-input>
      </el-form-item>

      <el-upload
        class="upload-demo"
        action="/api/lifespace/uploadImage"
        name="file"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :headers="importHeaders"
        :on-success="uploadSuccess"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <div style="height:30px;"></div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">走你</el-button>
        <el-button @click="back">还是算求吧</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var myToken = window.localStorage.getItem("token");
export default {
  name: "SendForm",
  data() {
    return {
      content: "",
      fileList: [],
      picList: [],
      importHeaders: { token: myToken }
    };
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      const array = response;
      console.log(array);
      this.picList.push(array);
    },
    back() {
      this.$router.go(-1);
    },
    onSubmit() {
      const contents = this.content;
      if (this.content == "" || this.content == undefined) {
        this.$message("完善发表内容，大兄弟！");
        return;
      } else {
        console.log(this.fileList);

        // axios请求开始
        var token = window.localStorage.getItem("token");
        this.axios.defaults.headers.common["token"] = token;
        this.axios
          .post("/api/lifespace/saveContent", {
            user: window.localStorage.getItem("account"),
            content: this.content,
            picList: this.picList
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
      }
    },
    handleRemove(file, fileList) {
      console.log("删除图片触发");
      console.log(file);
    
    },
    handlePreview(file) {
      console.log("222222222");
      console.log(file);
    }
  }
};
</script>
<style scoped>
.mainss {
  width: 60%;
  border: 1px solid black;
  height: 500px;
  margin: auto;
}
</style>