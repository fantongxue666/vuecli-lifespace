<template>
    <div>
        <div class="image-wrapper">
            <div class="img-wrapper">
                <div class="item" v-for="(item, index) in imgList" :key="index">
                    <img :src="item" class="dis-image">
                    <span class="delete" @click="deleteImg(index)">X</span>
                </div>
                <div class="item upload-icon" @click="preSelect" v-if="imgList.length < fileCount">
                    <span class="heng"></span>
                    <span class="su"></span>
                </div>
            </div>
            <input type="file" class="inputer" ref="inputRef" @change="handleChange($event)" multiple="multiple" >
        </div>
    </div>
</template>

<script>

export default {
    name: 'ImgUpload',
    props: {
        fileMaxSize: {
            //默认最大体积M
            type: Number,
            required: false,
            default: 10
        },
        fileCount: {
            //上传图片数量
            type: Number,
            required: false,
            default: 1
        },
        fileType: {
            type: String,
            required: false,
            default: 'image/png, image/jpeg, image/jpg'
        }
    },
    data () {
        return {
            imgList: []
        };
    },
    created() {
        
    },
    methods: {
        preSelect () {
            //点击上传图片之前
            this.$refs.inputRef.click();
        },

        handleChange (e) {
            /* eslint-disable */
            //点击上传图片事件
            console.log(e)
            
        },
        deleteImg (ind) {
            // 删除图片
            this.imgList.splice(ind,1);
        }
    }
};
</script>

<style scoped>
.image-wrapper{
    padding:10px 10px;
}
.inputer{
    width:100px;
    height:100px;
    display:none;
}
.img-wrapper{
    display:flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
}
.image-wrapper .upload-icon{
    margin-left:14px;
    margin-bottom:10px;
    /* overflow: hidden; */
    width:20%;
    height:70px;
    text-align: center;
    border:1px solid #dbdbdb;
}
.img-wrapper .item{
    position:relative;
    margin-left:14px;
    margin-bottom:10px;
    /* overflow: hidden; */
    width:20%;
    height:70px;
    text-align: center;
}
.img-wrapper .item .dis-image{
    width:100%;
    height:70px;
}
.image-wrapper .item .delete {
    display:inline-block;
    position:absolute;
    background-color: #dbdbdb;
    width: 20px;
    height: 20px;
    color: #fff;
    font-size: 0.8em;
    border-radius: 50%;
    top:-9px;
    right:-10px;
}

.img-wrapper .item .heng{
    position: absolute;
    display:inline-block;
    width:30px;
    height:3px;
    background:#dbdbdb;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
} 
.img-wrapper .item .su{
    position: absolute;
    display:inline-block;
    width:3px;
    height:30px;
    background:#dbdbdb;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
} 
</style>