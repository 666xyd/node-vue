<template>
    <div class="hero-detail">
        <!--  轮播图 -->
        <div>
            <van-swipe :autoplay="3000" indicator-color="#db9e3f">
                <van-swipe-item v-for="(item, index) in skinList" :key="index">
                    <span class="skin-name">{{item.skin}}</span>
                    <img :src="item.pic" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 英雄 -->
        <div class="hero-main">
            <van-tabs v-model="clickTab" animated title-active-color="#db9e3f">
                <van-tab title="英雄初识">
                    <hero-main :hero-info="heroInfo" :skin-list="skinList" @clickOnePic="clickOnePic"></hero-main>
                </van-tab>
                <van-tab title="进阶攻略"></van-tab>
            </van-tabs>
            <transition name="van-slide-down">
                <div class="one-pic" v-if="onePicShow" @click="onePicShow = false;">
                    <img :src="heroInfo.onePic" >
                </div>
            </transition>
        </div>


    </div>
</template>

<script>
    import heroMain from "./heroMain";
    export default {
        name: "heroDetail",
        data(){
            return{
                heroInfo: {},
                skinList: [],
                clickTab: 0,
                onePicShow: false,
            }
        },
        async created() {
            await this.getHeroInfo();
        },
        components: {
            heroMain,
        },
        methods: {
            //获取英雄信息
            getHeroInfo(){
                this.$http.get(`rest/heroInfo/heroId/${this.$route.params.id}`).then((res) => {
                    this.heroInfo = res.data;
                    this.getSkinList();
                })
            },

            //获取该英雄皮肤列表
            getSkinList(){
                this.$http.get(`rest/skinInfo/findByHeroName/${this.heroInfo.name}`).then((res)=>{
                    this.skinList = res.data;
                    //下面的代码是为了将‘原皮’这个皮肤放在数组中的第一个
                    let index = null;
                    for(let i = 0; i < this.skinList.length; i++){
                        if(this.skinList[i].way.includes('原皮')){
                            index = i;
                        }
                    }
                    this.skinList.unshift(this.skinList.splice(index,1)[0])
                })
            },

            //点击一图识英雄
            clickOnePic(){
                this.onePicShow = true;
            }
        }

    }
</script>

<style scoped>
    .hero-detail >>> .van-swipe-item{
        position: relative;
    }

    .hero-detail >>> .van-swipe-item .skin-name{
        position: absolute;
        color: white;
        font-weight: 700;
        font-size: 1.538rem;
        left: 2rem;
        bottom: 3rem;
    }

    .hero-main >>> .van-tabs__line{
        background-color: #db9e3f;
    }

    .hero-main{
        height: fit-content;
        overflow-y: scroll;
    }

    .one-pic{
        width: 100vw;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        overflow-y: scroll;
        z-index: 100;
        margin-bottom: 0;
    }

    .one-pic img{
        width: 100%;
    }
</style>