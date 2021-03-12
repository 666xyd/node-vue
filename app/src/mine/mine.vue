<template>
    <div class="mine">
        <!-- 背景 -->
        <div class="mine-back">
            <img :src="userInfo.pic">
        </div>

        <!-- 用户信息主要内容 -->
        <div class="mine-main">
            <div class="mine-part flex flex-column al-center flex-center">
                <!-- 头像 -->
                <div class="mine-photo">
                    <!-- 没有头像 -->
                    <div v-if="!userInfo.pic">
                        <div>{{userInfo.pic}}</div>
                        <van-uploader :after-read="afterRead" v-model="userPhoto" :max-count="1"></van-uploader>
                    </div>
                    <!-- 有头像 -->
                    <div v-else class="photo">
                        <img :src="userInfo.pic">
                        <van-uploader :after-read="afterRead" :max-count="1" ref="upload"></van-uploader>
                    </div>

                </div>

                <!-- 信息 -->

                <div class="info-simple flex flex-evenly ta-center" v-if="!isEdit">
                    <van-icon name="edit" size="20" color="#db9e3f" @click="edit"/>
                    <div class="fw-700">{{userInfo.name}}</div>
                </div>

                <div class="info-simple flex flex-evenly" v-else>
                    <van-button plain round size="mini" color="#db9e3f" @click="save">保存</van-button>
                    <input v-model="userInfo.name">
                </div>

                <div class="mine-info">
                    <div class="info-item" v-for="(item, index) in infoItem" :key="index" @click="$router.push({name: `${item.url}`})">
                        <div class="flex al-center"><van-icon :name="item.icon" size="16" color="#db9e3f"/>{{item.name}}</div>
                        <van-icon name="arrow"/>
                    </div>
                </div>

                <div class="login-out" @click="loginOut">退出登录</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import { Dialog } from 'vant';
    import Vue from 'vue';
    Vue.use(Toast);
    Vue.use(Dialog);
    export default {
        name: "mine",
        data(){
            return{
                userInfo: {},
                userName: '',
                userPhoto: [],
                infoItem: [
                    {name: '收藏', icon: 'like-o', url: 'like'},
                    {name: '点赞', icon: 'good-job-o', url: 'agree'},
                    {name: '浏览记录', icon: 'browsing-history-o', url: 'record'},
                    {name: '设置', icon: 'setting-o' , url: 'setting'},
                ],
                isEdit: false,
            }
        },
        components:{

        },
        created() {
            this.removeBack();
            this.getUserInfo();
        },
        methods: {

            //对背景进行移动
            removeBack(){
                this.$nextTick(()=>{
                    let back = document.getElementsByClassName('mine-back')[0];
                    back.style.height = '25vh';
                })
            },

            //获取用户信息
            getUserInfo(){
                this.getStore('user_info').then((res)=>{
                    this.userInfo = res[0];
                    if(!this.userInfo.name){
                        //如果用户姓名为空，则改为“用户+手机号”
                        this.userName = `用户${localStorage.phone}`
                    }else{
                        this.userName = this.userInfo.name;
                    }

                })
            },

            //上传图片后
            async afterRead(file){
                this.userPhoto = [];
                const params = new FormData();
                params.append("file", file.file);
                await this.$http.post(`${this.$http.defaults.baseURL}` + '/upload', params).then((res)=>{
                    this.userPhoto.push({url: res.data.url, isImage: true});
                })
                let user_info = {
                    name: this.userName,
                    phone: localStorage.phone,
                    pic: this.userPhoto[0].url,
                }
                this.$http.put(`rest/appUserInfo/${this.userInfo._id}`, user_info).then((res)=>{
                    this.userInfo = res.data;
                    window.location.reload();
                });
            },

            //编辑
            edit(){
                this.isEdit = true;
            },

            //保存
            save(){
                let user_info = {
                    name: this.userInfo.name,
                    phone: localStorage.phone,
                }
                this.$http.put(`rest/appUserInfo/${this.userInfo._id}`, user_info).then((res)=>{
                    this.userInfo = res.data;
                    this.getUserInfo();
                    this.isEdit = false;
                    Toast("修改成功！")
                });
            },

            //退出登录
            loginOut(){
                Dialog.confirm({
                    title: '温馨提示',
                    message: '是否要残忍离开？',
                    confirmButtonColor: '#db9e3f',
                    closeOnClickOverlay: true,
                })
                    .then(() => {
                        // on confirm
                        localStorage.phone = null;
                        this.$router.push({name: 'login'});
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
        },

    }
</script>

<style scoped>

    .mine-back{
        width: 100%;
        height: 50vh;
        overflow: hidden;
        border-bottom-left-radius: 55% 20%;
        border-bottom-right-radius: 55% 20%;
        box-shadow: 2px 2px 5px #999999;
        position: relative;
        transition: 1.2s;
    }

    .mine-back img{
        width: 100%;
        filter: blur(5px);
        opacity: 0.9;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .mine-main{
        transform: translateY(-45px);
    }

    .mine-part{
        padding: 0 3.077rem;
    }

    .mine-part >>> .van-button--mini{
        padding: 0 0.615rem;
        width: fit-content;
    }

    .photo{
        width: 6.154rem;
        height: 6.154rem;
        border: 1px solid #db9e3f;
        padding: 0.308rem;
        overflow: hidden;
        border-radius: 50%;
        position: relative;
    }

    .photo img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .photo >>> .van-uploader{
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }

    .info-simple{
        width: 100%;
        margin-top: 0.923rem;
        font-size: 1.231rem;
        color: #343440;
        position: relative;
        height: 24px;
        color: #db9e3f;
    }

    .info-simple >>> .van-icon, .info-simple >>> .van-button{
        position: absolute;
        left: 2.308rem;
    }

    .info-simple input{
        border: none;
        border-bottom: 1px solid #db9e3f;
        background-color: inherit;
        text-align: center;
        width: 50%;
        font-size: 1.077rem;
        color: #343440;
    }

    .mine-info{
        width: 100%;
        border: 1px solid #db9e3f;
        padding: 0 0.923rem;
        border-radius: 0.923rem;
        margin-top: 0.923rem;
        margin-bottom: 0.923rem;
    }

    .info-item{
        padding: 1.231rem 0;
        font-size: 1.077rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .info-item:last-child{
        border-bottom: none;
    }

    .info-item >>> .van-icon{
        margin-right: 0.462rem;
    }

    .login-out{
        width: 100%;
        text-align: center;
        padding: 0.923rem 0;
        border-radius: 1.846rem;
        color: white;
        background-color: rgba(219,158,63,.9);
    }

</style>