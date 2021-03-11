<template>
    <div class="operation">
        <van-tabs v-model="active" swipeable animated>
            <van-tab title="简介">
                <div class="flex flex-around">
                    <div class="operation-card" v-for="(item, index) in operation" :key="index">
                        <van-icon :name="item.click ? item.iconClick : item.icon" :class="{isClick:item.click, dislike: index === 2}"
                                  @click="clickItem(item)"/>{{index !== 2 ? (article[item.title] || 0) : '不喜欢'}}
                    </div>
                </div>
            </van-tab>
            <van-tab :title="`评论 ${evaluateList.length}`">
                <div class="message flex flex-between">
                    <van-field v-model="message" rows="1" autosize type="textarea" placeholder="发条友善的评论"/>
                    <van-button type="primary" plain round size="small" hairline color="#db9e3f"
                                :disabled="message === ''" @click="messagePost">发布</van-button>
                </div>
                <!-- 评论列表 -->
                <div class="evaluate-list">
                    <div v-for="(item, index) in evaluateList" :key="index" class="evaluate-item">
                        <div class="flex al-center">
                            <!-- 头像 -->
                            <div class="left-part">
                                <img :src="item.user.pic">
                            </div>
                            <div class="evaluate-auth">
                                <p class="fc-primary fw-700 fs-lg" style="margin-bottom: 0.154rem">{{item.name}}</p>
                                <p class="fs-xs fc-grey">{{item.date}}</p>
                            </div>
                        </div>
                        <!-- 内容 -->
                        <div class="evaluate-content">
                            {{item.content}}
                            <span style="position: absolute; right: 0" class="fs-xs fc-primary"
                                  v-if="item.isDelete" @click="toDelete(item)">删除</span>
                        </div>

                    </div>
                </div>

            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import { Dialog } from 'vant';
    import Vue from 'vue';
    Vue.use(Toast);
    Vue.use(Dialog);
    import utils from "../utils";
    export default {
        name: "operation",
        data(){
            return{
                active: 0,
                operation:[
                    { icon: 'like-o', iconClick: 'like', click: false, title: 'like'},
                    { icon: 'good-job-o', iconClick: 'good-job', click: false, title: 'agree'},
                    { icon: 'good-job-o', iconClick: 'good-job', click: false, title: 'dislike'},
                    { icon: 'share-o', iconClick: 'share', click: false, title: 'share'},
                ],
                message:'',
                user_info: {},
                evaluateList: [],
            }
        },
        props: {
            article: {
                type: Object,
                default: () => {
                    return {

                    }
                },
            }
        },
        created() {
            this.getEvaluateList();
        },
        methods: {
            async clickItem(item){
                let user = {};
                await this.getStore('user_info').then((res)=>{
                    user = res[0];
                })
                item.click = !item.click;
                if(item.index !== 2){
                    if(item.click){
                        this.article[item.title] +=1;
                        this.$http.post(`rest/appUserInfo/${item.title}Update/${user.phone}`, {id: this.article._id});
                    }else{
                        this.article[item.title] -=1;
                        this.$http.post(`rest/appUserInfo/${item.title}Delete/${user.phone}`, {id: this.article._id});
                    }
                    let params = {};
                    params[item.title] = this.article[item.title];
                    this.$http.put(`rest/articleInfo/${this.$route.params.id}`,params).then((res)=>{
                        this.$emit('clickItem');
                    })
                };
            },

            //获取评论
            getEvaluateList(){
                this.$http.get(`rest/evaluate/evaluateArticleId/${this.$route.params.id}`).then((res)=>{
                    this.evaluateList = res.data;
                    this.getStore('user_info').then((res)=>{
                        let user = res[0];
                        for(let i = 0; i < this.evaluateList.length; i++){
                            this.evaluateList[i].isDelete = this.evaluateList[i].name === user.name
                        }
                    })
                })
            },

            //发布评论
            messagePost(){
                this.getStore('user_info').then((res)=>{
                    this.user_info = res[0];
                    let params = {
                        id: this.$route.params.id,
                        name: this.user_info.name,
                        user: this.user_info,
                        content: this.message,
                        date: utils.getCurrentTime(),
                    }
                    this.$http.post('rest/evaluate', params).then((res)=>{
                        Toast("发布成功！");
                        this.message = '';
                        this.getEvaluateList();
                    })
                })
            },

            //删除评论
            toDelete(item){
                Dialog.confirm({
                    title: '温馨提示',
                    message: '是否要产出该条评论？',
                    confirmButtonColor: '#db9e3f',
                    closeOnClickOverlay: true,
                })
                    .then(() => {
                        // on confirm
                        this.$http.delete(`rest/evaluate/${item._id}`).then((res)=>{

                            Toast('删除成功！');
                            this.getEvaluateList();
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });

            }
        }

    }
</script>

<style scoped>

    .operation >>> .van-tabs__wrap{
        height: 2.308rem;
        margin-bottom: 0.308rem;
    }

    .operation >>> .van-tab{
        font-size: 1rem!important;
    }

    .operation >>>.van-tab__pane{
        border: 1px solid #db9e3f;
        padding: 0.769rem 1.077rem;
        border-radius: 0.616rem 0.616rem 0 0;
    }

    .operation >>> .van-tabs__line{
        background-color: #db9e3f;
    }

    .operation-card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.923rem;
    }

    .operation-card >>> .van-icon{
        margin-bottom: 0.308rem;
        font-size: 1.231rem;
    }

    .dislike{
        transform: rotate(180deg);
    }

    .isClick{
        color: #db9e3f;
    }

    .message >>> .van-field{
        border: 1px solid #e9e9e9;
        border-radius: 0.615rem;
        padding: 0.308rem 1.231rem;
        width: 80%;
    }

    .message >>> .van-button--small{
        height: 2.154rem;
        line-height: 2.154rem;
        padding: 0 0.923rem;
    }

    .evaluate-list{
        margin-top: 1.385rem;
    }

    .evaluate-list .left-part{
        width: 3.077rem;
        height: 3.077rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.615rem;
    }

    .evaluate-list img{
        width: 100%;
        height: 100%;
    }

    .evaluate-item{
        margin-bottom: 1.538rem;
        padding-bottom: 0.615rem;
        border-bottom: 1px solid #e9e9e9;
    }

    .evaluate-content{
        padding-left: 3.538rem;
        position: relative;
    }
</style>