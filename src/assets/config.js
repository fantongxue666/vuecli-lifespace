// 全局js
function getConfig(){
    const token=window.localStorage.getItem("token");
    if(token!=null&&token!=''&&token!=undefined){
        return 1;
    }else{
        return 0;
    }
}


//公开的方法
export default {
  getConfig:getConfig,//获取 公共配置方法
}