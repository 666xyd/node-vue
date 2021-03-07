<template>
    <div class="skill-detail">
        <van-dialog v-model="popupShow" title=" " close-on-click-overlay confirm-button-color="#db9e3f">
            <van-row gutter="10" type="flex" align="center">
                <van-col span="5"><img :src="skill.icon" class="icon"></van-col>
                <van-col span="19">{{skill.describe}}</van-col>
            </van-row>

            <img :src="skill.pic" class="pic">
            <p class="level">
                <span class="name fw-700 fc-primary fs-lg">{{skill.name}}</span>
                <span class="fc-grey fs-sm">(Level.{{skill.level}}解锁)</span>
            </p>
        </van-dialog>
    </div>

</template>

<script>
    export default {
        name: "skillDetail",
        props: {
            value: {
                type:Boolean,
                default: false,
            },
            skill: {
                type: Object,
                default: () => {
                    return {

                    }
                },
            }
        },
        watch: {
            value(newValue){
                this.popupShow = newValue
            },
            popupShow(newValue){
                this.$emit('input', newValue);
            }
        },
        data(){
            return{
                popupShow: this.value,
            }
        },

    }
</script>

<style scoped>

    .skill-detail >>> .van-dialog__header{
        color: #db9e3f;
        font-weight: 700;
    }

    .skill-detail >>> .van-dialog__content{
        padding: 0.308rem 0.462rem;

    }

    .skill-detail .pic{
        width: 100%;
        border-radius: 0.615rem;
    }

    .skill-detail .icon{
        width: 100%;
        border-radius: 50%;
    }

    .skill-detail >>> .van-row{
        margin-bottom: 0.923rem;
        padding: 0 1.231rem;
    }

    .skill-detail >>> .van-col--19{
        font-size: 1rem;
        line-height: 1.538rem;
    }

    .level{
        padding: 0 0.923rem;
        font-size: 1rem;
        text-align: center;
    }

    .name{
        margin-right: 0.308rem;
    }

</style>