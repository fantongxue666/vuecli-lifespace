
export default {
    backgroundColor: '#FFFFFF',
    title: {
        text: '全国地图大数据',
        subtext: '虚构数据',
        x:'center'
    },
    tooltip : {
        trigger: 'item'
       
    },
 
    //配置属性
    series: [{
        name: '数据',
        type: 'map',
        mapType: 'china',
        roam: true,
        label: {
            normal: {
                show: true  //省份名称
            },
            emphasis: {
                show: true
            }
        },
        data:[
            {name:"南海诸岛",value:0},
            {name: '北京', value: 0},
            {name: '天津', value: 0},
            {name: '上海', value: 0},
            {name: '重庆', value: 0},
            {name: '河北', value: 0},
            {name: '河南', value: 0},
            {name: '云南', value: 0},
            {name: '辽宁', value: 0},
            {name: '黑龙江', value: 0},
            {name: '湖南', value: 0},
            {name: '安徽', value: 0},
            {name: '山东', value: 0},
            {name: '新疆',text:'垃圾城市', value: 0},
            {name: '江苏', value: 0},
            {name: '浙江', value: 0},
            {name: '江西', value: 0},
            {name: '湖北', value: 0},
            {name: '广西', value: 0},
            {name: '甘肃', value: 0},
            {name: '山西', value: 0},
            {name: '内蒙古', value: 0},
            {name: '陕西', value: 0},
            {name: '吉林', value: 0},
            {name: '福建', value: 0},
            {name: '贵州', value: 0},
            {name: '广东', value: 0},
            {name: '青海', value: 0},
            {name: '西藏', value: 0},
            {name: '四川', value: 0},
            {name: '宁夏', value: 0},
            {name: '海南', value: 0},
            {name: '台湾', value: 0},
            {name: '香港', value: 0},
            {name: '澳门', value: 0}
        ],
        nameMap: {
            
        }
        
    }]
};