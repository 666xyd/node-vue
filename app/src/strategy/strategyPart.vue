<template>
    <div class="strategy-part">
        <div class="strategy-list" v-if="strategyList.length">
            <div v-for="(item, index) in strategyList" :key="index" >
                <div class="flex strategy-item al-center flex-between fs-lg" @click="toStrategy(item)">
                    <span>{{item.title}}</span>
                    <span>{{item.date.split(' ')[0]}}</span>
                </div>
            </div>
        </div>
        <div class="strategy-empty" v-else>
            <van-empty description="暂无攻略" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "strategyPart",
        data(){
            return{
                strategyList: [],
            }
        },
        components: {

        },
        created() {
            this.getStrategyList();
        },
        methods: {
            //获取攻略列表
            getStrategyList(){
                this.$http.get('rest/strategyInfo').then((res)=>{
                    let length = res.data.length >= 5 ? 5 : res.data.length;
                    for(let i = 0; i < length; i++){
                        this.strategyList.push(res.data[i])
                    }
                })
            },

            //攻略详情
            toStrategy(item){
                this.$router.push({name: 'strategyDetail', params: {id: item._id}});
            }
        },
    }
</script>

<style scoped>
    .strategy-part{
        margin-bottom: 1.846rem;
    }

    .strategy-item{
        padding: 0.923rem 1.846rem;
        color: #343440;
    }
</style>