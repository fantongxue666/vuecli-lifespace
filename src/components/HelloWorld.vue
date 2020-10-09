<template>
  <div id="lalala">
    <router-link class="writeMsg" to="/SendForm">我要发表朋友圈</router-link>
    <el-button class="writeMsg1" type="text" @click="open">退朝</el-button>
    <div class="writeMsg2">
      <div>
        <img :src="'http://fdfs.tiger2.cn/'+touxiang" alt />
      </div>
      <span>{{username}}</span>
    </div>

    <div id="list">
      <el-dialog title="预览文件" :visible.sync="isViewPdf20" width="30%" :fullscreen="false">
        <img :src="picUrl" frameborder="0" style="width: 100%; height: 100%;" />
      </el-dialog>

      <div v-for="(item,index) in test" v-bind:key="item.id" class="box clearfix">
        <!-- <a class="close" href="javascript:;">×</a> -->
        <img class="head" v-bind:src="'http://fdfs.tiger2.cn/'+item.toppicurl" alt />
        <div class="content">
          <div class="main">
            <p class="txt">
              <span class="user">{{item.username}}：</span>
              {{item.content}}
            </p>
            <ul>
              <li style="float:left;" v-for="child in item.pictures" v-bind:key="child.id">
                <img
                  @click="review($event)"
                  class="pic"
                  :src="'http://fdfs.tiger2.cn/'+child.picurl"
                  alt
                />
              </li>
            </ul>
          </div>
          <div class="content">
            <div class="info clearfix">
              <span class="time">{{item.times}}</span>
              <a
                class="praise"
                @click="zan($event)"
                :id="item.id"
                :data-index="index"
                href="javascript:;"
              >赞</a>
              <!-- <a class="praise" @click="zan($event)" :id="item.id" href="javascript:;">取消赞</a> -->
            </div>
            <div class="praises-total" total="0" style="display: none;"></div>
            <!-- 评论开始 -->
            <div class="praises-total" total="4" style="display: block;">{{item.zan}}个人觉得很赞</div>

            <div class="comment-list">
              <div
                v-for="childtwo in item.contentList"
                v-bind:key="childtwo.id"
                class="comment-box clearfix"
                user="self"
              >
                <img class="myhead" :src="'http://fdfs.tiger2.cn/'+childtwo.userpicurl" alt />
                <div class="comment-content">
                  <p class="comment-text">
                    <span class="user">{{childtwo.account}}：</span>
                    {{childtwo.pinglun}}
                  </p>
                  <p class="comment-time">{{childtwo.pltime}}</p>
                </div>
              </div>
            </div>
            <!-- 评论结束 -->
            <div class="text-box">
              <textarea class="comment" v-model="comment" autocomplete="off">评论…</textarea>
              <button class="btn" @click="huifu($event)" :id="item.id">回 复</button>
              <span class="word">
                <span class="length">0</span>/140
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  name: "HelloWorld",
  data() {
    return {
      loading: true,
      test: [],
      srcValue: "",
      isViewPdf20: false,
      picUrl: "",
      touxiang: "",
      username: "",
      comment: "评论...",
      base_api:""
    };
  },
   mounted(){
    this.base_api = process.env.VUE_APP_BASE_API
  },
  methods: {
    huifu(e) {
      if (
        this.comment == null ||
        this.comment == "评论..." ||
        this.comment == undefined
      ) {
        this.$message({
          message: "评论内容不许为空",
          type: "error"
        });
      } else {
        // axios请求开始
        var token = window.localStorage.getItem("token");
        this.axios.defaults.headers.common["token"] = token;
        this.axios
          .post(this.base_api+"/lifespace/insertPingLun", {
            user: window.localStorage.getItem("account"),
            contentid: e.currentTarget.id,
            pinglun: this.comment,
            userpicurl: window.localStorage.getItem("touxiang"),
            account: window.localStorage.getItem("username")
          })
          .then(response => {
            var code = response.data.errorCode;
            if (code == "101") {
              this.$alert("token失效，请重新登录", "警告", {
                confirmButtonText: "确定",
                callback: action => {
                  _this.$router.push({ path: "/" });
                }
              });
            } else {
              console.log(response);
              if (response.data === 1) {
                this.$message({
                  message: "评论成功",
                  type: "success"
                });
                console.log(response);
                this.axios
                  .post(this.base_api+"/lifespace/getAllContent")
                  .then(response => {
                    var code = response.data.errorCode;
                    console.log(response);
                    this.test = response.data;
                  });
              }
            }
          })
          .catch(function(error) {
            this.$message.error("服务器发生故障");
          });
        // axios请求结束
        this.comment = "评论...";
      }
    },
    zan(e) {
      console.log(e.currentTarget.id);
      const index = e.target.getAttribute("data-index");

      var _this = this;
      // axios请求开始
      var token = window.localStorage.getItem("token");
      this.axios.defaults.headers.common["token"] = token;
      this.axios
        .post(this.base_api+"/lifespace/dianzan", {
          user: window.localStorage.getItem("account"),
          contentid: e.currentTarget.id
        })
        .then(response => {
          var code = response.data.errorCode;
          if (code == "101") {
            this.$alert("token失效，请重新登录", "警告", {
              confirmButtonText: "确定",
              callback: action => {
                _this.$router.push({ path: "/" });
              }
            });
          } else {
            console.log(response);
            this.axios.post(this.base_api+"/lifespace/getAllContent").then(response => {
              var code = response.data.errorCode;
              console.log(response);
              this.test = response.data;
            });
          }
        })
        .catch(function(error) {
          this.$message.error("服务器发生故障");
        });
      // axios请求结束
    },
    open() {
      this.$confirm("您铁定了心要退朝吗？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退朝!"
          });
          this.$router.replace({ path: "/" });
          window.localStorage.clear();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "算了"
          });
        });
    },
    review(e) {
      console.log(e.srcElement.currentSrc);
      this.isViewPdf20 = true;
      this.picUrl = e.srcElement.currentSrc;
    }
  },
  created() {
    const touxiang = window.localStorage.getItem("touxiang");
    const username = window.localStorage.getItem("username");
    this.touxiang = touxiang;
    this.username = username;
    var _this = this;
    // axios请求开始
    var token = window.localStorage.getItem("token");
    this.axios.defaults.headers.common["token"] = token;
    this.axios
      .post(process.env.VUE_APP_BASE_API+"/lifespace/getAllContent")
      .then(response => {
        var code = response.data.errorCode;
        if (code == "101") {
          this.$alert("token失效，请重新登录", "警告", {
            confirmButtonText: "确定",
            callback: action => {
              _this.$router.push({ path: "/" });
            }
          });
        } else {
          console.log(response);
          this.test = response.data;
        }
      })
      .catch(function(error) {
        this.$message.error("服务器发生故障");
      });
    // axios请求结束
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- style加上scoped表示此css样式只在本模块中有效 -->
<style scoped>
li {
  list-style: none;
  float: left;
  width: 33.3%; /*三列图片排列*/
  height: 100px; /*当图片尺寸不一的时候，设置一个高度*/
  overflow: hidden; /*超出隐藏*/
}

li img {
  width: 100%;
}
.writeMsg {
  font-size: 12px;
  position: absolute;
  right: 20%;
  top: 30px;
  border: 1px solid lightgray;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  line-height: 30px;
  border-radius: 20px;
  cursor: pointer;
  color: gray;
}
.writeMsg1 {
  font-size: 12px;
  position: absolute;
  right: 15%;
  top: 30px;
  border: 1px solid lightgray;
  height: 30px;
  width: 60px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  line-height: 30px;
  border-radius: 20px;
  cursor: pointer;
  color: gray;
}
.writeMsg2 {
  font-size: 12px;
  position: absolute;
  right: 5%;
  top: 30px;
  height: 30px;
  width: 115px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 30px;
  cursor: pointer;
  color: gray;
}
.writeMsg2 div {
  border-radius: 90px;
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  overflow: hidden;
  /* border: 1px solid lightgray; */
}
.writeMsg2 div img {
  width: 100%;
  height: 100%;
}
.writeMsg:hover {
  background-color: #ff0000;
  color: white;
}
.writeMsg1:hover {
  background-color: #ff0000;
  color: white;
}
#list {
  font-size: 12px;
}
body {
  line-height: 120%;
  text-align: center;
  color: #333;
  padding: 20px;
}
a {
  color: #333;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
* {
  margin: 0;
  padding: 0;
  border: none;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *height: 1%;
}
#list {
  margin: 0 auto;
  text-align: left;
  width: 540px;
}
.box {
  border-top: 1px solid #eee;
  position: relative;
  width: 540px;
  padding: 20px 0;
}
.box:hover .close {
  display: block;
}
.close {
  display: none;
  top: 0px;
  right: 0px;
  width: 28px;
  height: 28px;
  border: 1px solid #eee;
  position: absolute;
  background: #f2f4f7;
  line-height: 27px;
  text-align: center;
}
.close:hover {
  background: #c8d2e2;
  text-decoration: none;
}
.head {
  float: left;
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.content {
  float: left;
  width: 440px;
}
.main {
  margin-bottom: 10px;
}
.txt {
  margin-bottom: 10px;
}
.user {
  color: #369;
}
.pic {
  margin-right: 5px;
  width: 200px;
  border: 1px solid #eee;
}
.info {
  height: 20px;
  line-height: 19px;
  font-size: 12px;
  margin: 0 0 10px 0;
}
.info .time {
  color: #ccc;
  float: left;
  height: 20px;
  padding-left: 20px;
}
.info .praise {
  color: #369;
  float: right;
  height: 20px;
  padding-left: 18px;
}
.info .praise:hover {
  text-decoration: underline;
}
.praises-total {
  margin: 0 0 10px 0;
  height: 20px;
  padding: 5px 0 5px 25px;
  line-height: 19px;
}
.comment-box {
  padding: 10px 0;
  border-top: 1px solid #eee;
}
.comment-box:hover {
  background: rgb(247, 247, 247);
}
.comment-box .myhead {
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.comment-box .comment-content {
  float: left;
  width: 400px;
}
.comment-box .comment-content .comment-time {
  color: #ccc;
  margin-top: 3px;
  line-height: 16px;
  position: relative;
}
.comment-box .comment-content .comment-praise {
  display: none;
  color: #369;
  padding-left: 17px;
  height: 20px;
  position: absolute;
  bottom: 0px;
  right: 44px;
}
.comment-box .comment-content .comment-operate {
  display: none;
  color: #369;
  height: 20px;
  position: absolute;
  bottom: 0px;
  right: 10px;
}
.comment-box .comment-content:hover .comment-praise {
  display: inline-block;
}
.comment-box .comment-content:hover .comment-operate {
  display: inline-block;
}
.text-box .comment {
  border: 1px solid #eee;
  display: block;
  height: 15px;
  width: 428px;
  padding: 5px;
  resize: none;
  color: #ccc;
}
.text-box .btn {
  font-size: 12px;
  font-weight: bold;
  display: block;
  cursor: pointer;
  float: right;
  width: 65px;
  height: 25px;
  border: 1px solid #0c528d;
  color: #fff;
  background: #4679ac;
}
.text-box .btn-off {
  border: 1px solid #ccc;
  color: #ccc;
  background: #f7f7f7;
}
.text-box .word {
  display: none;
  float: right;
  margin: 7px 10px 0 0;
  color: #666;
}
.text-box-on .comment {
  height: 50px;
  color: #333;
}
.text-box-on .btn {
  display: inline;
}
.text-box-on .word {
  display: inline;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
