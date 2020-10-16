<!--  -->
<template>
  <div>
    <!--  -->
    <div class="line"></div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">
            <img style="width:30px;height:30px;border-radius:45px;" :src="'http://fdfs.tiger2.cn/'+touxiang" alt />
            {{username}}
        </template>
        <el-menu-item index="2-1">
            <router-link to="/HelloWorld" style="color:black;">动态列表</router-link>
        </el-menu-item>
        <el-menu-item index="2-1">
            <router-link to="/SendForm" style="color:black;">发表动态</router-link>
        </el-menu-item>
        <el-menu-item index="2-1">
            <router-link to="/Chat" style="color:black;">实时聊天</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
            <el-button type="text" @click="open" style="color:black;">退出</el-button>
        </el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4">
        <a href="https://www.ele.me" target="_blank">订单管理</a>
      </el-menu-item>
    </el-menu>

    <!--  -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "Top",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["touxiang", "username"],
  data() {
    //这里存放数据
    return {
        activeIndex: '1',
        activeIndex2: '1'
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
       
      },
    open() {
      this.$confirm("您铁定了心要退朝吗？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // axios请求开始
        var token = window.localStorage.getItem("token");
        this.axios.defaults.headers.common["token"] = token;
        this.axios
          .post(process.env.VUE_APP_BASE_API + "/lifespace/logout", {
            account: window.localStorage.getItem("account")
          })
          .then(response => {
            
          })
          .catch(function(error) {
           
          });
        // axios请求结束
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
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
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
</style>