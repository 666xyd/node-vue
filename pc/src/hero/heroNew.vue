<template>
    <div class="hero-new initMain">
        <div class="">
            <div class="title">英雄信息</div>
            <div class="content">
                <el-form label-width="100px">
                    <!-- 英雄图片 -->
                    <el-form-item label="英雄图片：" class="required">
                        <hero-pic v-model="pic"></hero-pic>
                        <alarm-text text="请选择英雄图片" :empty="picError"></alarm-text>
                    </el-form-item>

                    <!-- 英雄名称 -->
                    <el-form-item label="英雄名称：" class="required">
                        <el-input placeholder="请输入英雄名称" v-model="name"></el-input>
                        <alarm-text text="请输入英雄名称" :empty="nameError"></alarm-text>
                    </el-form-item>

                    <!-- 英雄获取方式 -->
                    <el-form-item label="获取方式：" class="required">
                        <el-select placeholder="请选择获取方式" v-model="way" multiple @change="wayChoose" @remove-tag="remove">
                            <el-option  v-for="item in wayList" :key="item.id" :value="item.name" :label="item.name"></el-option>
                        </el-select>
                        <alarm-text text="请选择获取方式" :empty="wayError"></alarm-text>
                        <span class="add" @click="getWayNew">+新增获取方式</span>
                    </el-form-item>

                    <!-- 金币售价 -->
                    <el-form-item label="金币售价：" v-show="moneyWayShow" class="required">
                        <el-input placeholder="请输入金币价格" v-model="money"></el-input>
                        <alarm-text text="请输入金币价格" :empty="moneyError"></alarm-text>
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

                    <!-- 上架时间 -->
                    <el-form-item label="上架时间：" class="required">
                        <el-date-picker v-model="date" type="date" placeholder="请选择上架时间" :clearable="false" format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"></el-date-picker>
                        <alarm-text text="请选择上架时间" :empty="dateError"></alarm-text>
                    </el-form-item>

                    <!-- 英雄定位 -->
                    <el-form-item label="英雄分类：" class="required">
                        <el-select placeholder="请选择英雄分类" v-model="classify" multiple>
                            <el-option v-for="item in classifyList" :key="item.id" :value="item.name" :label="item.name"></el-option>
                        </el-select>
                        <alarm-text text="请选择英雄分类" :empty="classifyError"></alarm-text>
                        <span class="add" @click="classifyNew">+新增英雄分类</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!--底部按钮-->
        <div class="button-bg">
            <div class="button-control">
                <el-button style="color: #666;">取 消</el-button>
                <el-button type="primary" @click="submit()">保 存</el-button>
            </div>
        </div>
        <!-- 新增获取方式弹窗 -->
        <get-way-new v-model="popupShow" v-if="popupShow" @success="newWaySuccess"></get-way-new>

        <!-- 新增分类弹窗 -->
        <classify-new v-model="classifyNewShow" v-if="classifyNewShow" @success="newClassifySuccess"></classify-new>

    </div>
</template>

<script>
    import HeroPic from "../components/HeroPic";
    import getWayNew from "./components/getWayNew";
    import classifyNew from "./components/classifyNew";
    import AlarmText from "../components/AlarmText";
    export default {
        name: "heroNew",
        components: {
            HeroPic,
            getWayNew,
            classifyNew,
            AlarmText
        },
        data(){
            return {
                pic: [],
                picError: false,
                date: '',           //上架时间
                dateError: false,
                way: '',                //获取方式
                wayError: false,
                wayList: [],               //获取方式列表
                classifyList: [],          //英雄定位列表
                classify: '',              //选择的英雄定位
                classifyError: false,
                popupShow: false,          //获取方式弹窗是否显示
                classifyNewShow:false,         //新增分类弹窗是否显示
                moneyWayShow: false,           //金币售价方式是否显示
                chipWayShow: false,           //碎片方式是否显示
                couponWayShow: false,           //点券售价方式是否显示
                name: '',                  //英雄名称
                nameError: false,
                money: null,               //金币价格
                moneyError: false,
                chip: null,                //英雄碎片数量
                chipError: false,
                coupon: null,              //点券数量
                couponError: false,
            }
        },
        created() {
            this.getWayList();
            this.getClassify();
        },
        methods: {
            //获取英雄定位列表
            getClassify(){
                this.$http.get('rest/heroCategories').then((res)=>{
                    this.classifyList = [];
                    for(let i = 0 ; i < res.data.length; i++){
                        this.classifyList.push({name: res.data[i].classify, id: i});
                    }
                })
            },

            //新增获取方式
            getWayNew(){
                this.popupShow = true;
            },

            //新增英雄分类
            classifyNew(){
                this.classifyNewShow = true;
            },

            //获得获取方式列表
            getWayList(){
                this.$http.get('rest/heroGetWay').then((res)=>{
                    //每一次进来都要清空，不然在当前页面新增获取方式会有错误
                    this.wayList = [];
                    for(let i = 0; i < res.data.length; i++){
                        this.wayList.push({name: res.data[i].name, id: i})
                    }
                })
            },

            //新增获取方式点击保存
            newWaySuccess(){
                this.getWayList();
            },

            //新增英雄分类点击保存时
            newClassifySuccess(){
                this.getClassify();
            },

            //获取方式的下拉框变化时
            wayChoose(choose){
                if(choose.includes('金币')){
                    this.moneyWayShow = true;
                }
                if(choose.includes('英雄碎片')){
                    this.chipWayShow = true;
                }
                if(choose.includes('点券')){
                    this.couponWayShow = true;
                }
            },

            //获取方式多选框移除选中的值时
            remove(choose){
                if(choose === '金币'){
                    this.moneyWayShow = false;
                }
                if(choose === '英雄碎片'){
                    this.chipWayShow = false;
                }
                if(choose === '点券'){
                    this.couponWayShow = false
                }
            },


            //保存该新英雄时
            submit(){
                // if(this.pic.length === 0){
                //     this.picError = true;
                //     return false
                // }else{
                //     this.picError = false;
                // }

                if(this.name === ''){
                    this.nameError = true;
                    return false;
                }else{
                    this.nameError = false
                }

                if(this.way.length === 0){
                    this.wayError = true;
                    return false;
                }else{
                    this.wayError = false
                }

                if(this.way.includes('金币') && this.money === null){
                    this.moneyError = true;
                    return false;
                }else{
                    this.moneyError = false;
                }

                if(this.way.includes('英雄碎片') && this.chip === null){
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

                if(this.date === ''){
                    this.dateError = true;
                    return false;
                }else{
                    this.dateError = false
                }

                if(this.classify === ''){
                    this.classifyError = true;
                    return false;
                }else{
                    this.classifyError = false
                }

                let params = {
                    pic: this.pic,
                    name: this.name,
                    way: this.way,
                    money: this.money,
                    chip: this.chip,
                    coupon: this.coupon,
                    date: this.date,
                    classify: this.classify,
                }

                let res = this.$http.post('rest/heroInfo', params);
                this.$message({message: '保存成功', type: "success"});
                this.$router.push({name: 'heroList'});
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

    /*统一输入框的长度*/
    .hero-new >>> .el-input__inner{
        width: 374px;
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
</style>