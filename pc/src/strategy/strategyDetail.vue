<template>
    <div class="strategy-detail initMain">

        <div class="strategyInfo">
            <p class="title">{{strategy.title}}</p>
            <p class="date">{{strategy.date}}</p>
            <div class="content" v-html="strategy.content"></div>
        </div>
        <!--底部按钮-->
        <div class="button-bg">
            <div class="button-control">
                <el-button style="color: #666;" @click="toDelete">删除</el-button>
                <el-button type="primary" @click="toEdit">编 辑</el-button>
            </div>
        </div>
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
        async created() {
            let res =  await this.$http.get(`rest/strategyInfo/strategyId/${this.$route.params.id}`)
            this.strategy = res.data;
            let page = document.getElementsByClassName('initMain')[0];
            //对所有图片进行居中处理
            this.$nextTick(()=>{
                let imgTotal = page.getElementsByTagName('img');
                for(let i = 0; i < imgTotal.length; i++){
                    window.console.log(imgTotal[i].parentNode.classList);
                    imgTotal[i].parentNode.classList.add('text-center');
                }

            })
        },
        methods: {
            async toDelete(){
                this.$confirm(`是否删除攻略--《${this.strategy.title}》?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () => {
                    await this.$http.delete(`rest/strategyInfo/${this.strategy._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push({name: 'strategyList'});
                })
            },
            toEdit(){
                this.$router.push({name: 'strategyEdit', params: {id: this.strategy._id}})
            }
        },
    }
</script>

<style scoped>

    .strategy-detail{
        margin-bottom: 80px;
    }

    .strategyInfo{
        margin-top: 20px;
    }

    .title{
        text-align: center;
        font-size: 32px;
        font-weight: bold;
    }

    .date{
        text-align: center;
        margin-top: 12px;
        color: #666666;
    }

    .strategyInfo {
        width: 100%;
    }

    .content{
        width: 100%;
        margin-top: 24px;
        padding: 0 180px;
        letter-spacing: 1px;
    }

    .content >>> p{
        white-space: pre-line;
        text-indent: 2em;
        padding: 4px 10px;
    }

    .content >>> img{
        max-width: calc(100% - 2em);
    }

    .strategy-detail >>> .text-center{
        text-align: center;
    }
</style>