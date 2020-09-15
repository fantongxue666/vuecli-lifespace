<template>
  <div id="lalala">
    <router-link class="writeMsg" to="/SendForm">我要发表朋友圈</router-link>

    <div id="list">
      <!-- <div class="box clearfix">
        <a class="close" href="javascript:;">×</a>
        <img
          class="head"
          src="https://www.17sucai.com/preview/639532/2016-10-25/54aa535f0001a6df00000000/images/1.jpg"
          alt
        />
        <div class="content">
          <div class="main">
            <p class="txt">
              <span class="user">Andy：</span>轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。
            </p>
            <img
              class="pic"
              src="https://www.17sucai.com/preview/639532/2016-10-25/54aa535f0001a6df00000000/images/img1.jpg"
              alt
            />
          </div>
          <div class="info clearfix">
            <span class="time">02-14 23:01</span>
            <a class="praise" href="javascript:;">赞</a>
          </div>
          <div class="praises-total" total="4" style="display: block;">4个人觉得很赞</div>
          <div class="comment-list">
            <div class="comment-box clearfix" user="self">
              <img
                class="myhead"
                src="https://www.17sucai.com/preview/639532/2016-10-25/54aa535f0001a6df00000000/images/my.jpg"
                alt
              />
              <div class="comment-content">
                <p class="comment-text">
                  <span class="user">我：</span>写的太好了。
                </p>
                <p class="comment-time">
                  2014-02-19 14:36
                  <a
                    href="javascript:;"
                    class="comment-praise"
                    total="1"
                    my="0"
                    style="display: inline-block"
                  >1 赞</a>
                  <a href="javascript:;" class="comment-operate">删除</a>
                </p>
              </div>
            </div>
          </div>
          <div class="text-box">
            <textarea class="comment" autocomplete="off">评论…</textarea>
            <button class="btn">回 复</button>
            <span class="word">
              <span class="length">0</span>/140
            </span>
          </div>
        </div>
      </div>

      <div class="box clearfix">
        <a class="close" href="javascript:;">×</a>
        <img
          class="head"
          src="https://www.17sucai.com/preview/639532/2016-10-25/54aa535f0001a6df00000000/images/2.jpg"
          alt
        />
        <div class="content">
          <div class="main">
            <p class="txt">
              <span class="user">人在旅途：</span>三亚的海滩很漂亮。
            </p>
            <img
              class="pic"
              src="https://www.17sucai.com/preview/639532/2016-10-25/54aa535f0001a6df00000000/images/img5.jpg"
              alt
            />
          </div>
          <div class="info clearfix">
            <span class="time">02-14 23:01</span>
            <a class="praise" href="javascript:;">赞</a>
          </div>
          <div class="praises-total" total="0" style="display: none;"></div>
          <div class="comment-list">
            <div class="comment-box clearfix" user="other">
              <img
                class="myhead"
                src="https://www.17sucai.com/preview/639532/2016-10-25/54aa535f0001a6df00000000/images/4.jpg"
                alt
              />
              <div class="comment-content">
                <p class="comment-text">
                  <span class="user">老鹰：</span>我也想去三亚。
                </p>
                <p class="comment-time">
                  2014-02-19 14:36
                  <a href="javascript:;" class="comment-praise" total="0" my="0">赞</a>
                  <a href="javascript:;" class="comment-operate">回复</a>
                </p>
              </div>
            </div>
          </div>
          <div class="text-box">
            <textarea class="comment" autocomplete="off">评论…</textarea>
            <button class="btn">回 复</button>
            <span class="word">
              <span class="length">0</span>/140
            </span>
          </div>
        </div>
      </div> -->


      <div v-for="item in test" v-bind:key="item.id" class="box clearfix">
        <a class="close" href="javascript:;">×</a>
        <img
          class="head"
          v-bind:src="item.toppicurl"
          alt
        />
        <div class="content">
          <div class="main">
            <p class="txt">
              <span class="user">小Y：</span>英国艺术家 Jane Perkin 能利用很多不起眼的东西进行创作，甚至是垃圾。首饰、纽扣、玩具等等都可以作为他创作的工具并创作出惟妙惟肖的画作，丝毫不逊色于色彩丰富的颜料。
            </p>
          </div>
          <div class="info clearfix">
            <span class="time">02-11 13:17</span>
            <a class="praise" href="javascript:;">赞</a>
          </div>
          <div class="praises-total" total="0" style="display: none;"></div>
          <div class="comment-list"></div>
          <div class="text-box">
            <textarea class="comment" autocomplete="off">评论…</textarea>
            <button class="btn">回 复</button>
            <span class="word">
              <span class="length">0</span>/140
            </span>
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
      test:[]
    };
  },
  methods: {
   
  },
  created() {
     // axios请求开始
        this.axios
          .post("/api/lifespace/getAllContent")
          .then(response => {
            console.log(response.data);
            this.test=response.data;
          })
          .catch(function(error) {
            this.$message.error('服务器发生故障');

          });
        // axios请求结束
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- style加上scoped表示此css样式只在本模块中有效 -->
<style scoped>
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
.writeMsg:hover {
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
  display: none;
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
