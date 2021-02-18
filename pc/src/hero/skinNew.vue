<template>
    <div class="initMain skin-new">
        <div class="">
            <div class="title">皮肤信息</div>
            <div class="content flex">
                <div class="content-left">
                    <el-form label-width="100px">
                        <!-- 皮肤图片 -->
                        <el-form-item label="皮肤图片：" class="required">
                            <el-upload
                                class="avatar-uploader"
                                :action="$http.defaults.baseURL + '/upload'"
                                :show-file-list="false"
                                :on-success="afterUpload">
                                <img v-if="pic" :src="pic" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <alarm-text text="请选择皮肤图片" :empty="picError"></alarm-text>
                        </el-form-item>

                        <!-- 选择英雄 -->
                        <el-form-item label="英雄名称：" class="required">
                            <el-select v-model="name" filterable placeholder="请选择">
                                <el-option
                                    v-for="(item,index) in heroList" :key="index" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                            <alarm-text text="请选择英雄" :empty="nameError"></alarm-text>
                        </el-form-item>

                        <!-- 皮肤名称 -->
                        <el-form-item label="皮肤名称：" class="required">
                            <el-input v-model="skin"></el-input>
                            <alarm-text text="请输入皮肤名称" :empty="skinError"></alarm-text>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="content-right">
                    <el-form label-width="100px">
                        <!-- 皮肤获取方式 -->
                        <el-form-item label="获取方式：" class="required">
                            <el-select placeholder="请选择获取方式" v-model="way" multiple @change="wayChoose" @remove-tag="remove">
                                <el-option  v-for="item in wayList" :key="item.id" :value="item.name" :label="item.name"></el-option>
                            </el-select>
                            <alarm-text text="请选择获取方式" :empty="wayError"></alarm-text>
                            <span class="add" @click="getWayNew">+新增获取方式</span>
                        </el-form-item>

                        <!-- 皮肤碎片 -->
                        <el-form-item label="碎片数量：" v-show="chipWayShow" class="required">
                            <el-input placeholder="请输入碎片数量" v-model="chip"></el-input>
                            <alarm-text text="请输入碎片数量" :empty="chipError"></alarm-text>
                        </el-form-item>

                        <!-- 点券售价 -->
                        <el-form-item label="点券售价：" v-show="couponWayShow" class="required">
                            <el-input placeholder="请输入点券数量" v-model="coupon"></el-input>
                            <alarm-text text="请输入点券数量" :empty="couponError"></alarm-text>
                        </el-form-item>

                        <!-- 皮肤性质 -->
                        <el-form-item label="皮肤性质：" class="required">
                            <el-select placeholder="请选择皮肤性质" v-model="character">
                                <el-option  v-for="item in characterList" :key="item.id" :value="item.name" :label="item.name"></el-option>
                            </el-select>
                            <alarm-text text="请选择皮肤性质" :empty="characterError"></alarm-text>
                            <span class="add" @click="getCharacterNew">+新增皮肤性质</span>
                        </el-form-item>


                        <!-- 上架时间 -->
                        <el-form-item label="上架时间：" class="required">
                            <el-date-picker v-model="date" type="date" placeholder="请选择上架时间" :clearable="false" format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"></el-date-picker>
                            <alarm-text text="请选择上架时间" :empty="dateError"></alarm-text>
                        </el-form-item>

                        <el-form-item label="限定活动获得：">
                            <el-radio v-model="limit" label="是" border size="small">是</el-radio>
                            <el-radio v-model="limit" label="否" border size="small">否</el-radio>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
        </div>

        <!--底部按钮-->
        <div class="button-bg">
            <div class="button-control">
                <el-button style="color: #666;" v-if="$route.name === 'skinEdit'" @click="deleteSkin">删除</el-button>
                <el-button style="color: #666;" @click="toCancel">取 消</el-button>
                <el-button type="primary" @click="submit()">保 存</el-button>
            </div>
        </div>

        <!-- 新增获取方式弹窗 -->
        <get-way-new v-model="popupShow" v-if="popupShow" @success="newWaySuccess" type="skinGetWay"></get-way-new>

        <!-- 新增皮肤性质弹窗 -->
        <character-new v-model="characterShow" v-if="characterShow" @success="newCharacterSuccess"></character-new>
    </div>
</template>

<script>
    import AlarmText from "../components/AlarmText";
    import getWayNew from "./components/getWayNew";
    import characterNew from "./components/characterNew";
    export default {
        name: "skinNew",
        components: {
            AlarmText,
            getWayNew,
            characterNew
        },
        data(){
            return {
                pic: '',
                picError: false,
                heroList: [],     //英雄列表
                name: '',         //选中的英雄
                nameError: false,
                skin: '',
                skinError: false,
                way: [],          //选中的获取方式列表
                wayList: [],      //
                character: '',
                characterList: [],
                wayError: false,
                characterError: false,
                popupShow: false,  //新增获取方式弹窗是否显示
                characterShow: false,     //新增皮肤性质弹窗是否显示
                chip: '',
                chipWayShow: false,
                chipError: false,
                coupon: '',
                couponWayShow: false,
                couponError: false,
                date: '',
                dateError: false,
                limit: '否',      //是否限时活动获得
            }
        },
        async created(){
            this.getHeroList();
            this.getWayList();
            this.getCharacterList();
            if(this.$route.params.id){
                //編輯皮肤頁面
                let res = await this.$http.get(`rest/skinInfo/skinId/${this.$route.params.id}`);
                let skinInfo = res.data;
                this.chip = skinInfo.chip;
                this.coupon = skinInfo.coupon;
                this.date = skinInfo.date;
                this.limit = skinInfo.limit;
                this.name = skinInfo.name;
                this.pic = skinInfo.pic;
                this.skin = skinInfo.skin;
                this.character = skinInfo.character;
                this.way = skinInfo.way;
                this.wayChoose(this.way);
            }
        },
        methods: {
            //图片上传
            afterUpload(res){
                this.pic = res.url;
            },

            //获取英雄列表
            getHeroList(){
                this.$http.get('rest/heroInfo').then((res)=>{
                    this.heroList = res.data;
                })
            },

            //获取获取方式列表
            getWayList(){
                this.$http.get('rest/skinGetWay').then((res)=>{
                    //每一次进来都要清空，不然在当前页面新增获取方式会有错误
                    this.wayList = [];
                    for(let i = 0; i < res.data.length; i++){
                        this.wayList.push({name: res.data[i].name, id: i})
                    }
                    window.console.log(this.wayList);
                })
            },

            //获取皮肤性质列表
            getCharacterList(){
                this.$http.get('rest/skinCharacter').then((res) => {
                    //每一次进来都要清空，不然在当前页面新增获取方式会有错误
                    this.characterList = [];
                    for(let i = 0; i < res.data.length; i++){
                        this.characterList.push({name: res.data[i].name, id: i})
                    }
                    window.console.log(this.characterList);
                })
            },

            //点击新增获取方式
            getWayNew(){
                this.popupShow = true;
            },

            //点击新增皮肤性质
            getCharacterNew(){
               this.characterShow = true;
            },

            //新增获取方式成功
            newWaySuccess(){
                this.getWayList();
            },

            //新增皮肤性质成功
            newCharacterSuccess(){
                this.getCharacterList();
            },

            //获取方式的下拉框变化时
            wayChoose(choose){
                if(choose.includes('皮肤碎片')){
                    this.chipWayShow = true;
                }
                if(choose.includes('点券')){
                    this.couponWayShow = true;
                }
            },

            //获取方式多选框移除选中的值时
            remove(choose){
                if(choose === '皮肤碎片'){
                    this.chipWayShow = false;
                }
                if(choose === '点券'){
                    this.couponWayShow = false
                }
            },

            //删除皮肤
            deleteSkin(){
                this.$confirm(`是否删除皮肤--${this.skin}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.$http.delete(`rest/skinInfo/${this.$route.params.id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push({name: 'skinList'});
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

            //点击保存
            async submit(){
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

                if(this.skin === ''){
                    this.skinError = true;
                    return false;
                }else{
                    this.skinError = false;
                }

                if(this.way.length === 0){
                    this.wayError = true;
                    return false;
                }else{
                    this.wayError = false
                }

                if(this.way.includes('皮肤碎片') && this.chip === null){
                    this.chipError = true;
                    return false;
                }else{
                    this.chipError = false;
                }

                if(this.way.includes('点券') && this.coupon === null){
                    this.couponError = true;
                    return false;
                }else{
                    this.couponError = false;
                }

                if(this.character === ''){
                    this.characterError = true;
                    return false;
                }else{
                    this.characterError = false;
                }

                if(this.date === ''){
                    this.dateError = true;
                    return false;
                }else{
                    this.dateError = false
                }


                //根据填写的英雄姓名，得到英雄所属的分类，方便对皮肤进行分类
                let result = await this.$http.get(`rest/heroInfo/name/${this.name}`);
                let classify = result.data[0].classify;

                let params = {
                    pic: this.pic,
                    name: this.name,
                    skin: this.skin,
                    way: this.way,
                    chip: this.chip,
                    coupon: this.coupon,
                    date: this.date,
                    limit: this.limit,
                    classify: classify,
                    character: this.character,
                }
                let res = null;

                if(this.$route.params.id){
                    //编辑英雄
                    res = this.$http.put(`rest/skinInfo/${this.$route.params.id}`, params)
                }else{
                    //新增
                    res = this.$http.post('rest/skinInfo', params);
                }
                this.$message({message: '保存成功', type: "success"});
                await this.$router.push({name: 'skinList'});
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
        display: flex;
        justify-content: space-evenly;
    }

    .content-left{
        width: 50%;
    }

    /*统一输入框的长度*/
    .skin-new >>> .el-input__inner{
        width: 374px;
    }

    .skin-new >>> .el-textarea__inner{
        width: 424px;
        min-height: 204px!important;
    }

    .add{
        color: #00C191;
        font-size: 12px;
        margin-left: 8px;
        cursor: pointer;
    }

    .button-bg .el-button {
        width: 68px;
        height: 36px;
        padding: 0;
    }

    .button-bg >>> .el-button--default:hover {
        background: #F6F6F6 !important;
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
        width: 480px;
        height: 220px;
        line-height: 220px;
        text-align: center;
    }

    .avatar {
        width: 480px;
        height: 220px;
        display: block;
    }

    .skin-new >>> .el-checkbox-group{
        width: calc(100% - 200px);
    }
</style>