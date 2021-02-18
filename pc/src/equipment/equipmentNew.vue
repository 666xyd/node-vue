<template>
    <div class="equipment-new initMain">
        <div class="">
            <div class="title">装备信息</div>
            <div class="content">
                <el-form label-width="100px">
                    <el-form-item label="装备图片：" class="required">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false"
                            :on-success="afterUpload">
                            <img v-if="pic" :src="pic" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <alarm-text text="请选择装备图片" :empty="picError"></alarm-text>
                    </el-form-item>

                    <el-form-item label="装备名称：" class="required">
                        <el-input v-model="name" placeholder="请输入装备名称"></el-input>
                        <alarm-text text="请输入装备名称" :empty="nameError"></alarm-text>
                    </el-form-item>

                    <el-form-item label="装备分类：" class="required">
                        <el-select placeholder="请选择获取方式" v-model="classify">
                            <el-option  v-for="item in classifyList" :key="item.id" :value="item.name" :label="item.name"></el-option>
                        </el-select>
                        <alarm-text text="请选择获取方式" :empty="classifyError"></alarm-text>
                        <span class="add" @click="getClassifyNew">+新增装备分类</span>
                    </el-form-item>

                    <el-form-item label="装备价格：" class="required">
                        <el-input v-model="money" placeholder="请输入装备价格"></el-input>
                        <alarm-text text="请输入装备价格" :empty="moneyError"></alarm-text>
                    </el-form-item>

                    <el-form-item label="装备效果：" class="required effect">
                        <div class="effect-list">
                            <template v-for="(item,index) in effect">
                                <div :key="index" style="display: inline-block">
                                    <el-input v-model="item.value"></el-input>
                                    <span class="equip-effect">{{ item.text }}</span>
                                </div>
                            </template>
                        </div>
                        <alarm-text text="请至少填写一种效果" :empty="effectError"></alarm-text>
                    </el-form-item>

                    <el-form-item label="装备描述：" class="required">
                        <el-input type="textarea" v-model="describe"></el-input>
                        <alarm-text text="请输入英雄描述" :empty="describeError"></alarm-text>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!--底部按钮-->
        <div class="button-bg">
            <div class="button-control">
                <el-button style="color: #666;" v-if="$route.name === 'equipmentEdit'" @click="toDelete">删除</el-button>
                <el-button style="color: #666;" @click="toCancel">取 消</el-button>
                <el-button type="primary" @click="submit">保 存</el-button>
            </div>
        </div>

        <!-- 新增装备分类弹窗 -->
        <equipment-classify v-model="popupShow" v-if="popupShow" @success="success"></equipment-classify>

    </div>
</template>

<script>
    import AlarmText from "../components/AlarmText";
    import equipmentClassify from "./components/equipmentClassify";
    export default {
        name: "equipmentNew",
        data(){
            return{
                pic: '',
                picError: false,
                name: '',
                nameError: false,
                popupShow: false,
                classify: '',
                classifyError: false,
                classifyList: [],
                money: null,
                moneyError: false,
                describe: '',
                describeError: false,

                //装备效果start
                effect: [
                    {title: 'attackPhy',value: '', text: '物理攻击'},
                    {title: 'attackSpeed',value: '', text: '%攻击速度'},
                    {title: 'absorbPhy', value: '', text: '%物理吸血'},
                    {title: 'attackMagic',value: '', text: '法术攻击'},
                    {title: 'absorbMagic', value: '', text: '%法术吸血'},
                    {title: 'powerReturn', value: '', text: '每5秒回蓝'},
                    {title: 'magicPower',value: '', text: '法力'},
                    {title: 'defensePhy',value: '', text: '物理防御'},
                    {title: 'defenseMagic',value: '', text: '法术防御'},
                    {title: 'cooling',value: '', text: '%冷却缩减'},
                    {title: 'life',value: '', text: '最大生命'},
                    {title: 'strike',value: '', text: '暴击'},
                    {title: 'removeSpeed',value: '', text: '移动速度'},
                    {title: 'selfDefine',value: '', text: '每5秒回血'},
                ],
                //装备效果end

                effectError: false,
            }
        },
        components: {
            AlarmText,
            equipmentClassify,
        },
        async created() {
            this.getEquipmentList();
            if(this.$route.params.id){
                //编辑装备
                let res = await this.$http.get(`rest/equipmentInfo/equipmentId/${this.$route.params.id}`);
                let item = res.data;
                this.pic = item.pic;
                this.name = item.name;
                this.classify = item.classify;
                this.money = item.money;
                this.describe = item.describe;
                for(let i = 0 ; i < item.effect.length; i++){
                    this.effect[i].value = item.effect[i].value;
                }
            }
        },
        methods: {
            //图片上传成功后
            afterUpload(res){
                this.pic = res.url;
            },

            //获取装备分类列表
            getEquipmentList(){
                this.$http.get('rest/equipmentClassify').then((res)=>{
                    //每一次进来都要清空，不然在当前页面新增获取方式会有错误
                    this.classifyList = [];
                    for(let i = 0; i < res.data.length; i++){
                        this.classifyList.push({name: res.data[i].name, id: i})
                    }
                })

            },

            //新增装备分类
            getClassifyNew(){
                this.popupShow = true;
            },

            //新增分类成功
            success(){
                this.getEquipmentList();
            },

            //删除
            toDelete(){
                this.$confirm(`是否删除装备--${this.name}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.$http.delete(`rest/equipmentInfo/${this.$route.params.id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push({name: 'equipmentList'});
                })
            },

            //取消
            toCancel(){
                this.$confirm(`是否取消编辑?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.$router.back();
                })
            },

            //保存装备
            submit(){
                if(this.pic.length === 0){
                    this.picError = true;
                    return false
                }else{
                    this.picError = false;
                }

                if(this.name === ''){
                    this.nameError = true;
                    return false;
                }else{
                    this.nameError = false
                }

                if(this.classify === ''){
                    this.classifyError = true;
                    return false;
                }else{
                    this.classifyError = false
                }

                if(this.money === null){
                    this.moneyError = true;
                    return false;
                }else{
                    this.moneyError = false;
                }

                let num = 0;
                for(let i = 0; i < this.effect.length; i++){
                    if(this.effect[i].value === ''){
                        num++;
                    }
                }
                if(num === this.effect.length){
                    this.moneyError = true;
                    return false;
                }else{
                    this.moneyError = false;
                }

                if(this.describe === ''){
                    this.describeError = true;
                    return false;
                }else{
                    this.describeError = false;
                }

                let params = {
                    pic: this.pic,
                    name: this.name,
                    classify: this.classify,
                    money: this.money,
                    effect:this.effect,
                    describe: this.describe,
                }

                let res;

                if(this.$route.params.id){
                    //编辑英雄
                    res = this.$http.put(`rest/equipmentInfo/${this.$route.params.id}`, params)
                }else{
                    //新增
                    res = this.$http.post('rest/equipmentInfo', params);
                }
                this.$message({message: '保存成功', type: "success"});
                this.$router.push({name: 'equipmentList'});
            }
        }
    }
</script>

<style scoped>

    .title {
        color: #666;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 24px;
    }

    .content{
        margin-left: 78px;
    }

    .avatar-uploader >>>  .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader  >>> .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 98px;
        height: 98px;
        line-height: 98px;
        text-align: center;
    }
    .avatar {
        width: 98px;
        height: 98px;
        display: block;
    }

    .add{
        color: #00C191;
        font-size: 12px;
        margin-left: 8px;
        cursor: pointer;
    }

    .equip-effect{
        color: #333;
        font-size: 14px;
        margin-left: 8px;
        margin-right: 12px;
        font-weight: bold;
    }

    /*统一输入框的长度*/
    .equipment-new >>> .el-input__inner{
        width: 374px;
    }

    .equipment-new >>> .el-textarea__inner{
        width: 524px;
        min-height: 204px!important;
    }

    .effect >>> .el-input{
        width: 80px;
    }

    .effect >>> .el-input__inner{
        width: 100%;
    }

    .effect-list{
        width: 80%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-row-gap: 12px;
    }

    .button-bg .el-button {
        width: 68px;
        height: 36px;
        padding: 0;
    }

    .button-bg >>> .el-button--default:hover {
        background: #F6F6F6 !important;
    }

</style>