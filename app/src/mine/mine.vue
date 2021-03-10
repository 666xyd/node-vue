<template>
    <div class="mine">
        <!-- 背景 -->
        <div class="mine-back">

        </div>


        <!-- 用户信息主要内容 -->
        <div class="mine-main">
            <div class="mine-part">
                <!-- 头像 -->
                <div class="mine-photo">
                    <!-- 没有头像 -->
                    <div v-if="!this.userInfo.pic">

                    </div>
                </div>


                <!-- 信息 -->
                <div>
                    <p>{{this.userName}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mine",
        data(){
            return{
                userInfo: {},
                userName: '',
                userPhoto: '',
            }
        },
        components:{

        },
        created() {
            this.getUserInfo();
        },
        methods: {
            //获取用户信息
            getUserInfo(){
                this.$nextTick(()=>{
                    this.getStore('user_info').then((res)=>{
                        this.userInfo = res;
                        if(!this.userInfo.name){
                            //如果用户姓名为空，则改为“用户+手机号”
                            this.userName = `用户${localStorage.phone}`
                        }else{
                            this.userName = this.userInfo.name;
                        }
                        window.console.log(this.userInfo.pic)
                    })
                })
            },

            //上传图片后
            afterRead(){

            }
        },

    }
</script>

<style scoped>
    .mine{

    }
</style>