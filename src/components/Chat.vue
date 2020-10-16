<!--  -->
<template>
  <div class>
    <top v-bind:touxiang="touxiang" v-bind:username="username"></top>
    <div class="wrapper">
      <div class="container">
        <div class="left">
          <div class="top">
            <input type="text" placeholder="Search" />
            <a href="javascript:;" class="search"></a>
          </div>
          <ul class="people">
            <li v-for="item in userList" v-bind:key="item.id" class="person" @click="toChat(item)">
              <img :src="'http://fdfs.tiger2.cn/'+item.toppicurl" alt />
              <span class="name">{{item.username}}</span>
              <span v-if="item.wd>0" class="time" style="font-size:12px;">{{item.wd}}条未读</span>
              <span v-if="item.status=='在线'" class="preview" style="color:blue;">[在线ING]</span>
              <span v-if="item.status=='离线'" class="preview" style="color:red;">[已离线]</span>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="top">
            <span>
              <span class="name">{{currentChatUser}}</span>
            </span>
          </div>

          <div id="Chat" class="chat" data-chat="person1">
            <!-- <div class="conversation-start">
              <span>上午5:38</span>
            </div>-->
            <div v-for="item in msgList" v-bind:key="item.id">
                <div :class='[item.type ?"bubble me":"bubble you"]'>{{item.content}}</div>
            </div>
           
          
          </div>

          <div class="write">
            <a href="javascript:;" class="write-link attach"></a>
            <input type="text" v-model="message" />
            <a href="javascript:;" class="write-link smiley"></a>
            <a href="javascript:;" class="write-link send" @click="send"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Top from "./Top";
export default {
  name: "Chat",
  //import引入的组件需要注入到对象中才能使用
  components: {
    top: Top
  },
  data() {
    //这里存放数据
    return {
      base_api: "",
      touxiang: "",
      username: "",
      userList: [],
      currentChatUser: "请选择您要聊天的对象",
      websock: null,
      receiveAccount: "", //接收人id
      message: "", //要发送的消息
      msgList: [],
      currentTab:""  //当前窗口是在和哪个账号聊天
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initWebSocket() {
      this.websock = null;
      //判断当前浏览器是否支持WebSocket
      var wsUrl = "ws://vue.tiger2.cn:8082/charRoomServer";
      var allUrl = wsUrl + "/" + window.localStorage.getItem("account");
      if ("WebSocket" in window) {
        //初始化weosocket(必须)
        this.websock = new WebSocket(allUrl); //新建一个webstock对象
        this.websock.onopen = this.websocketonopen;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      } else {
        alert("当前浏览器 Not support websocket");
      }
    },
    websocketonopen() {
      console.log("---连接建立成功---");
      //websocket连接后发送数据(send发送)
      let actions = this.receiveAccount; //请根据实际项目需要进行修改
      this.websocketsend(actions);
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      //this.redata = JSON.parse(e.data).data;
      console.log("-----websocket接收到的发送的数据-----");

      let str = e.data;
      let index = str.lastIndexOf(":");
      let sendUserAccount = str.substring(0, index);
      let sendMessage = str.substring(index + 1, str.length);
      console.log(
        "发送人：" + sendUserAccount + "----------发送信息：" + sendMessage
      );
      let account = window.localStorage.getItem("account");

      if(this.currentTab==sendUserAccount||account==sendUserAccount){
        if (account == sendUserAccount) {
        //发送人是自己
        this.msgList.push({
          type: true,
          time: new Date(),
          content: sendMessage
        });
      } else {
        //发送人是对方
        this.msgList.push({
          type: false,
          time: new Date(),
          content: sendMessage
        });
      }
      }
      
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    send() {
      this.websocketsend(this.message);
      this.message = "";
    },
    toChat(e) {

      // 把和e.username的聊天记录的status全部更改为已读


      //查询聊天记录
      // axios请求开始
    var token = window.localStorage.getItem("token");
    console.log("token:" + token);
    this.axios.defaults.headers.common["token"] = token;
    this.axios
      .post(process.env.VUE_APP_BASE_API + "/lifespace/getAllMessages", {
        senduser: window.localStorage.getItem("account"),
        receiveuser:e.account
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
          this.msgList = response.data;
        }
      })
      .catch(function(error) {
        this.$message.error("服务器发生故障");
      });
    // axios请求结束
      this.currentTab=e.account;
      this.currentChatUser = "正在和" + e.username + "对话中";
      this.initWebSocket();
      this.receiveAccount = e.account;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        var container = document.getElementById("Chat");
        container.scrollTop = container.scrollHeight;
      });
    },
    getAllUsers(){
      // axios请求开始
    var token = window.localStorage.getItem("token");
    console.log("token:" + token);
    this.axios.defaults.headers.common["token"] = token;
    this.axios
      .post(process.env.VUE_APP_BASE_API + "/lifespace/getAllUsers", {
        user: window.localStorage.getItem("account")
      })
      .then(response => {
        var code = response.data.errorCode;
        if (code == "101") {
         
        } else {
          console.log(response);
          this.userList = response.data;
        }
      })
      .catch(function(error) {
        this.$message.error("服务器发生故障");
      });
    // axios请求结束
    },
    timer: function () {
       this.getAllUsers();
       console.log("定时器执行");
     }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //this.initWebSocket();
    const touxiang = window.localStorage.getItem("touxiang");
    const username = window.localStorage.getItem("username");
    this.touxiang = touxiang;
    this.username = username;
    var _this = this;
    this.getAllUsers();
    setInterval(this.timer, 5000);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.scrollToBottom();
    this.base_api = process.env.VUE_APP_BASE_API;

    
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    this.scrollToBottom();
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style>
@import "../../static/css/reset.min.css";
@import "../../static/css/style.css";
</style>