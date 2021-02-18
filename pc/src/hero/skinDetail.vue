<template>
    <div class="skin-detail initMain">
        <p class="skin-name">{{skin.skin}}</p>
        <div class="skin-info">
            <div class="skin-card">
                <img :src="skin.pic">
            </div>

            <div class="skin-message">
                <div >
                    <span class="title">英雄姓名：</span>
                    <span class="value">{{skin.name}}</span>
                </div>

                <div >
                    <span class="title">皮肤名称：</span>
                    <span class="value">{{skin.skin}}</span>
                </div>

                <div>
                    <span class="title">获取方式：</span>
                    <span v-for="(item, index) in skin.way" :key="index">
                        {{item}}
                    </span>
                </div>

                <div>
                    <span class="title">皮肤性质：</span>
                    <Span>{{skin.character}}</Span>
                </div>

                <div v-if="payShow">
                    <span class="title">英雄售价：</span>
                    <span class="value" v-if="skin.way.includes('点券')">{{skin.coupon}}点券 </span>
                    <span class="value" v-if="skin.way.includes('皮肤碎片')">{{skin.chip}}皮肤碎片</span>
                </div>

                <div >
                    <span class="title">上架时间：</span>
                    <span class="value">{{skin.date}}</span>
                </div>

                <div >
                    <span class="title">是否限定：</span>
                    <span class="value">{{skin.limit}}</span>
                </div>
            </div>
        </div>

        <!--底部按钮-->
        <div class="button-bg">
            <div class="button-control">
                <el-button style="color: #666;" @click="deleteSkin">删 除</el-button>
                <el-button type="primary" @click="editSkin">编 辑</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "skinDetail",
        data(){
            return{
                skin: {},
                payShow: false,
            }
        },
        components: {

        },
        async created() {
            let res = await this.$http.get(`rest/skinInfo/skinId/${this.$route.params.id}`);
            this.skin = res.data;
            if(this.skin.way.includes('点券') || this.skin.way.includes('皮肤碎片')){
                this.payShow = true;
            }else{
                this.payShow = false;
            }
        },
        methods: {
            //删除皮肤
            deleteSkin(){
                this.$confirm(`是否删除皮肤--${this.skin.skin}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.$http.delete(`rest/skinInfo/${this.$route.params.id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push({name: 'skinList'});
                })
            },

            //编辑皮肤
            editSkin(){
                this.$router.push({name: 'skinEdit', params: {id: this.$route.params.id}})
            }
        },
    }
</script>

<style scoped>
    .skin-name{
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 12px;
    }

    .skin-info{
        display: flex;
    }

    .skin-card{
        width: 50%;
    }

    .skin-card img{
        width: 100%;
        border-radius: 6px;
    }

    .skin-message{
        padding: 0 24px;
    }

    .skin-message div{
        padding: 12px 12px;
    }

    .title{
        font-size: 20px;
        color: #00c191;
        font-weight: bold;
    }

    .button-bg .el-button {
        width: 68px;
        height: 36px;
        padding: 0;
    }

    .button-bg >>> .el-button--default:hover {
        background: #F6F6F6 !important;
    }
</style>