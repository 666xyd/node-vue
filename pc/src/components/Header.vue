<template>
    <div class="header">
        <div class="nameAndImg al-center" @click="popupShow = !popupShow ">
            <Avatar :width="120" :text="name" :portrait="pic"></Avatar>
            <span class="name">{{name}}</span>
            <i class="el-icon-caret-bottom"></i>
        </div>
        <div class="cancel" @click="cancelPopup" v-show="popupShow"></div>
        <div class="operation" v-show="popupShow">
            <div @click="toEdit"><i class="el-icon-user"></i>修改管理员信息</div>
            <div @click="toLogin"><i class="el-icon-circle-close"></i>退出登录</div>
        </div>
    </div>
</template>

<script>
    import Avatar from "./Avatar";
    export default {
        name: "Header",
        components: {
            Avatar,
        },
        data(){
            return {
                name: '许先生',
                popupShow: false,
                pic: '',
            }
        },
        created() {
            this.name = localStorage.name;
            if(localStorage.pic === 'undefined'){
                this.pic = '';
            }else{
                this.pic = localStorage.pic;
            }
        },
        methods: {
            toEdit(){
                this.popupShow = false;
                if(this.$route.name !== 'adminList'){
                    this.$router.push({name: 'adminList'});
                }
            },
            toLogin(){
                this.popupShow = false;
                this.$router.push({name: 'login'});
                localStorage.clear();
            },
            cancelPopup(){
                this.popupShow = false;
            }
        }
    }
</script>

<style scoped>
    .header{
        height: 64px;
        line-height: 64px;
        border-bottom: 1px solid #F5F7FA;
        background-color: white;
        box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
        position: relative;
    }

    .nameAndImg{
        position: absolute;
        right: 38px;
        cursor: pointer;
        height: 64px;
    }

    .name{
        font-size: 14px;
        color: #333;
        margin-left: 8px;
    }
    .operation{
        position: absolute;
        right: 38px;
        top: 52px;
        background-color: white;
        font-size: 14px;
        color: #666666;
        width: 182px;
        border-radius: 4px;
        line-height: 30px;
        box-shadow: 0 0 6px rgba(0, 0, 0, .19);
        z-index: 100;
    }

    .operation i{
        margin-right: 12px;
    }

    .operation div{
        cursor: pointer;
        padding: 8px 12px;
        transition: 0.9s;
    }

    .operation div:hover{
        background-color: rgba(0,0,0, 0.1);
    }

    .cancel{
        width: 100vw;
        height: 100vh;
        position: fixed;
    }
</style>