<template>
    <div class="part-item flex" @click="toDetail">
        <van-image width="140" height="70" :src="item.pic" fit="cover"/>
        <div class="item-info">
            <p class="van-multi-ellipsis--l2 fs-xl fc-dark">{{item.title}}</p>
            <div class="item-operation flex">
                <div class="operation-one"><van-icon name="eye-o" />{{item.view}}</div>
                <div class="operation-one"><van-icon name="notes-o" />{{evaluateList.length}}</div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "partItem",
        props:{
            item: {
                type: Object,
                default: () => {
                    return {

                    }
                }
            },
        },
        data(){
            return {
                evaluateList: [],
            }
        },
        created() {
            this.$nextTick(()=>{
                this.getEvaluateList();
            })

        },
        methods: {
            //获取文章评论
            getEvaluateList(){
                this.$http.get(`rest/evaluate/evaluateArticleId/${this.item._id}`).then((res)=>{
                    this.evaluateList = res.data;
                })
            },

            //去文章详情
            toDetail(){
                this.$router.push({name: `${this.item.type}Detail`, params: {id: this.item._id}});
            }
        },

    }
</script>

<style scoped>

.part-item{
    margin-bottom: 1.231rem;
}

.part-item >>> .van-image__img{
    border-radius: 0.615rem;
}

.part-item >>> .van-image{
    flex-shrink: 0;
}

.item-info{
    padding: 0.308rem 0.769rem;
    position: relative;
}

.item-operation{
    position: absolute;
    left: 0.769rem;
    bottom: 0.308rem ;
    color: #999999;
}

.operation-one{
    display: flex;
    align-items: center;
    margin-right: 0.615rem;
}

.operation-one >>> .van-icon{
    margin-right: 0.154rem;
}

</style>