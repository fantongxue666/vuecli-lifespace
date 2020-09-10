<template>
  <div>
<!-- template内容开始（外围必须包裹一个div，因为组件只允许有唯一的一个根元素） -->
    <button v-on:click="sendRequest">发送axios请求</button>
    <a href="##" @click="funs">跳转页面</a>
  <div v-show="showText">
    {{msg}}
  </div>
<!-- template内容结束 -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      showText:false,
      msg: ''
    }
  },
  methods:{
      funs(){
        this.$router.push({path:'/test'});
      },
      sendRequest(){
        // axios请求开始
        this.axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response=>{
            this.msg = response.data.bpi
            console.log("axios请求成功");
        })
        .catch(function (error) {
        console.log(error)
        })
        // axios请求结束
        this.showText=true
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- style加上scoped表示此css样式只在本模块中有效 -->
<style scoped>  

</style>
