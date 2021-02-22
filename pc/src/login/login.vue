<template>
    <div class="login">
        <el-card header="管理员登录" class="login-card">
            <el-form label-width="80px">
                <el-form-item label="用户名：">
                    <el-input placeholder="请输入用户名" v-model="name"></el-input>
                </el-form-item>

                <el-form-item label="密码：">
                    <el-input placeholder="请输入密码" type="password" v-model="password" maxlength="18" show-password></el-input>
                </el-form-item>

                <div class="login-bottom">
                    <el-button round @click="clearInput">重 置</el-button>
                    <el-button round @click="toLogin">登 录</el-button>
                </div>

            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                name: '',
                password: '',
            }
        },
        methods: {
            clearInput(){
                this.name = '';
                this.password = '';
            },

            async toLogin(){
                let params = {
                    name: this.name,
                    password: this.password,
                }
                let res = await this.$http.post('login', params);
                //浏览器关闭下次再次打开还存在
                localStorage.token = res.data.token;
                //sessionStorage则是浏览器关闭就不存在了
                await this.$router.push({name: 'heroList'})
                this.$message({
                    type: 'success',
                    message: '登陆成功'
                })
            }
        }
    }
</script>

<style scoped>
    .login{
        position: relative;
        width: 100%;
        height: 100vh;
        text-align: center;
        font-weight: bold;
        background-image: url("https://ossweb-img.qq.com/upload/webplat/info/yxzj/20210205/7629560023090.jpg");
    }

    .login-card{
        position: absolute;
        width: 30rem;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        background-color: rgba(255, 255, 255, 0.7);
    }

    .login >>> .el-card__header{
        text-align: center;
    }

    .login >>> .el-form-item{
        margin-bottom: 40px!important;
        margin-top: 40px!important;
    }

    .login-bottom{
        margin-top: 50px;
    }

    .login-bottom >>>.el-button{
        margin: 0 12px;
        color: #00c191!important;
        border: 1px solid #00c191!important;
        width: 100px!important;
        background-color: rgba(255, 255, 255, 0.7);;
    }

    .login-bottom >>> .el-button:hover{
        background-color: rgba(0,193,145, 0.8)!important;
        color: white!important;

    }

</style>