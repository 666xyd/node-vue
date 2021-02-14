<template>
    <el-upload :class="{'avatar-uploader': !pic.length, 'avatar-uploader-fill': pic.length}"
               action="" :show-file-list="false" :http-request="uploadImage" :before-upload="checkImage">
        <div v-if="pic.length" class="img-mask">
            <img :src="pic[0]">
            <p @click="pic=[]">重新上传</p>
            <div @click="pic=[]"></div>
        </div>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    export default {
        name: "WarePIc",
        props: {
            value: {
                type: Array
            },
        },
        data() {
            return {
                pic: this.value
            }
        },
        watch: {
            value(newValue) {
                this.pic = newValue;
            },
            pic(newValue) {
                this.$emit('input', newValue);
            }
        },
        methods: {
            //上传图片前的判断
            checkImage(file) {
                const isLt2M = file.size / 1024 / 1024 < 20;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 20MB!');
                }
                return isLt2M;
            },
            //上传商品图片
            uploadImage(f) {
                const formData = new FormData();
                formData.append('file', f.file);
                // api.uploadPic(formData).then((res) => {
                //     this.pic = [res.data.url];
                // });
            },
        }
    }
</script>

<style scoped>
    /*商品图片*/
    img {
        width: 86px;
        height: 64px;
        object-fit: cover; /*覆盖整个框*/
    }

    .img-mask {
        position: relative;
        height: 64px;
    }

    .img-mask p {
        width: 100%;
        height: 17px;
        position: absolute;
        bottom: 0;
        font-size: 12px;
        color: #FFF;
        text-align: center;
        line-height: 17px;
        background: rgba(51, 51, 51, 0.5);
        opacity: 0;
    }

    .img-mask div::after {
        content: '';
        height: 16px;
        width: 16px;
        position: absolute;
        top: -8px;
        right: -8px;
        opacity: 0;
        background: url("https://dxs-pictures.gd2.qingstor.com/pc_image/goods/%E7%A7%BB%E9%99%A4.svg");
    }

    .img-mask:hover p, .img-mask:hover div::after {
        opacity: 1;
    }

    .avatar-uploader, .avatar-uploader >>> .el-upload {
        box-sizing: border-box;
        width: 88px;
        height: 66px;
        border: 1px dashed #D2D3D5;
        border-radius: 2px;
        cursor: pointer;
    }

    .avatar-uploader-fill, .avatar-uploader-fill >>> .el-upload {
        box-sizing: border-box;
        width: 88px;
        height: 66px;
        border-radius: 2px;
        cursor: pointer;
    }

    .avatar-uploader >>> .el-upload:hover {
        border-color: #00C191;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 88px;
        height: 66px;
        line-height: 66px;
        text-align: center;
    }

</style>
