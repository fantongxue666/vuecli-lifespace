<template>
  <div>
    <div id="myMap" ref="myMap" style="width: 600px; height: 300px;"></div>
    我选中的是城市{{city}}
  </div>
</template>
 
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar"); // 引入柱状图组件
require("echarts/lib/chart/pie"); // 引入饼状图组件
require("echarts/map/js/china.js"); // 引入中国地图组件
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/theme/macarons"); //引入主题
require("echarts/theme/shine"); //引入主题
import option from "../assets/map-option";
export default {
  name: "Echart",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      chart: null,
      city:''
    };
  },
  created() {},
  mounted() {
    var _this=this;
    this.drawChinaMap();
    var calendarChart = this.$echarts.init(
      document.getElementById("myMap")
    );

    calendarChart.on("click", function(param) {
      console.log(param.name);
      _this.city=param.name
    });
    
  },
  updated() {
    if (!this.chart) {
      this.initChart();
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  computed: {},
  methods: {
    drawChinaMap() {
      this.chart = this.$echarts.init(
        document.getElementById("myMap"),
        "macarons"
      );
      this.chart.setOption(option);
    }
  }
};
</script>
 
<style scoped>
</style>