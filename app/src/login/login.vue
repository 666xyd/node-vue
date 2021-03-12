<template>
    <div class="login bg-white">
        <div class="login-content">
            <p class="fs-xl">欢迎来到王者荣耀</p>
            <!-- 登录 -->
            <div class="login-part">
                <div class="login-form">
                    <van-cell-group>
                        <van-field v-model="phone" label="手机号码" type="tel" placeholder="请输入手机号码" maxlength="11"/>
                        <van-field v-model="code" label="验证码" placeholder="请输入验证码" maxlength="6">
                            <template #button>
                                <van-button size="small" type="primary" round
                                            @click="codeClick" :disabled="codeDisable">{{codeText}}</van-button>
                            </template>
                        </van-field>
                    </van-cell-group>
                </div>
                <div class="button">
                    <van-button size="large" round color="rgba(219,158,63, 0.9)" @click="submit"
                                :disabled="phone.length !== 11 || code.length !== 6">登录</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import Vue from 'vue';
    Vue.use(Toast);
    import utils from "../utils";
    export default {
        name: "login",
        data(){
            return {
                phone: '',
                code: '',
                codeText: '发送验证码',
                codeDisable: false,
                returnCode: null,
            }
        },
        methods: {
            codeClick(){
                //判断手机号码格式是否正确
                if(!utils.is_phone(this.phone)){
                    Toast("手机号码格式错误！");
                    return false;
                }
                let time = 60;
                this.$http.get('loginCode').then((res)=>{
                    if(res.data.message === '短信验证码发送成功！'){
                        this.returnCode = res.data.code;
                        Toast('验证码发送成功！')
                    }else{
                        Toast('验证码发送失败！')
                    }
                })

                let timer = setInterval(() => {
                    if (time > 0) {
                        time--;
                        this.codeText = `${time}s后重试`;
                    }else{
                        window.clearInterval(timer);
                        time = 60;
                        this.codeText = `获取验证码`;
                        this.codeDisable = false;
                    }
                }, 1000);

                this.codeDisable = true;
            },

           async submit(){
                //判断验证码是否正确
                if(Number(this.code) !== Number(this.returnCode)){
                    Toast('验证码错误！')
                    return false;
                }
                let params = {
                    phone: this.phone,
                    pic: '',
                    name: '',
                };
                localStorage.phone = this.phone;

                let res = await this.$http.post('rest/appUserInfo', params);

                await this.$router.push({name: 'index'})
            }
        }
    }
</script>

<style scoped>
    .login{
        text-align: center;
        width: 100vw;
        height: 100vh;
    }

    .login-content{
        display: inline-block;
    }

    .login-part{
        padding: 0 2.769rem;
    }

    .login-form >>> .van-button--primary{
        background-color: white!important;
        border: 1px solid #db9e3f;
        color: #db9e3f;
    }

    .login-form >>> .van-button--primary:active{
        background-color: rgba(219,158,63, 0.5) !important;
        color: white;
    }

    .login-form >>> .van-button--disabled:active{
        background-color: white!important;
        color: #db9e3f!important;
    }

    .login-form >>> .van-field__label{
        display: flex;
        align-items: center;
    }

    .button {
        margin-top: 1.846rem;
    }
</style>