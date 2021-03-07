<template>
    <div class="strategy-detail">
        <div class="strategy-header">
            <p class="strategy-title fw-700 fs-xl fc-primary">{{strategy.title}}</p>
            <p class="strategy-date">{{strategy.date}}</p>
        </div>
        <div class="content" v-html="strategy.content"></div>
    </div>
</template>

<script>
    export default {
        name: "strategyDetail",
        data(){
            return{
                strategy: {},
            }
        },
        components: {

        },
        created() {
            this.getStrategyDetail();
        },
        methods: {
            //获取攻略信息
            getStrategyDetail(){
                this.$http.get(`rest/strategyInfo/strategyId/${this.$route.params.id}`).then((res)=>{
                    this.strategy = res.data;
                    let strategy = document.getElementsByClassName('strategy-detail')[0];
                    //对所有图片进行居中处理
                    this.$nextTick(()=>{
                        let imgTotal = strategy.getElementsByTagName('img');
                        for(let i = 0; i < imgTotal.length; i++){
                            window.console.log(imgTotal[i].parentNode.classList);
                            imgTotal[i].parentNode.classList.add('text-center');
                        }

                    })
                })
            }
        },
    }
</script>

<style scoped>
.strategy-detail{
    padding: 1.538rem 1.846rem;
}

.strategy-detail p{
    margin: 0;
}

.strategy-header{
    text-align: center;
    margin-bottom: 1.231rem;
}

.strategy-title{
    margin-bottom: 0.462rem!important;
    line-height: 1.846rem;
}

.content >>> p{
    margin: 0;
    white-space: pre-line;
    text-indent: 2em;
    padding: 0px 10px;
    line-height: 1.538rem;
}

.content  >>> img{
    max-width: 100%;
}

.strategy-detail >>> .text-center{
    padding: 0;
    text-align: center;
    text-indent: 0;
}
</style>