<template>
    <div class="bg-white">
        <div class="strategy-list" v-if="strategyListLength">
            <div class="strategy-item" v-for="(item, index) in strategyList" :key="index" @click="toStrategy(item)">
                <img :src="item.pic">
                <p class="strategy-title van-ellipsis">{{item.title}}</p>
            </div>
        </div>
        <div v-else>
            <van-empty description="暂无攻略" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "strategyList",
        components: {

        },
        data(){
            return{
                strategyList: [],
                strategyListLength: null,

            }
        },
        created() {
            this.getStrategyList();
        },
        methods:{
            //获取攻略列表
            getStrategyList(){
                this.$http.get('rest/strategyInfo').then((res)=>{
                    this.strategyList = res.data;
                    this.strategyListLength = res.data.length;
                    let length = this.strategyListLength >= 10 ? 10 : this.strategyListLength;
                    for(let i = 0; i < length; i ++){
                        this.list.push(this.articleList[i]);
                    }
                })
            },

            toStrategy(item){
                this.$router.push({name: 'strategyDetail', params: {id: item._id}});
            }
        },
    }
</script>

<style scoped>
    .strategy-list{
        padding: 1.846rem;
    }

    .strategy-item{
        margin: 0.923rem 0;
        position: relative;
    }

    .strategy-item .strategy-title{
        position: absolute;
        bottom: 1.538rem;
        z-index: 20;
        color: white;
        font-weight: 700;
        font-size: 1.231rem;
        padding: 0 0.923rem;
    }

    .strategy-item img{
        width: 100%;
        border-radius: 1.385rem;
    }

    .strategy-item p {
        margin: 0;
        width: 100%;
    }
</style>