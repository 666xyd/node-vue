<template>
    <div class="hero-new initMain">
        <div class="">
            <div class="content">
                <div class="content-left">
                    <div class="title">
                        <i class="el-icon-user-solid"></i>
                        英雄信息
                    </div>
                    <el-form label-width="100px" style="padding-left: 70px">
                        <!-- 英雄图片 -->
                        <el-form-item label="英雄图片：" class="required">
                            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                                :headers="getAuthHeaders()" :show-file-list="false" :on-success="afterUpload">
                                <img v-if="pic" :src="pic" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
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

                        <!-- 召唤师技能   -->
                        <el-form-item label="召唤师技能：">
                            <el-select placeholder="请选择召唤师技能" v-model="heroSkill" multiple>
                                <el-option v-for="item in heroSkillList" :key="item._id" :value="item.name + ' ' + item.icon" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>

                        <!--  生存能力  -->
                        <el-form-item label="生存能力：" class="power">
                            <el-input-number v-model="livePower" :min="1" :max="10" ></el-input-number>
                        </el-form-item>

                        <!--  攻击伤害  -->
                        <el-form-item label="攻击伤害：" class="power">
                            <el-input-number v-model="attackPower" :min="1" :max="10" ></el-input-number>
                        </el-form-item>

                        <!--  技能效果  -->
                        <el-form-item label="技能效果：" class="power">
                            <el-input-number v-model="skillPower" :min="1" :max="10" ></el-input-number>
                        </el-form-item>

                        <!--  上手难度  -->
                        <el-form-item label="上手难度：" class="power">
                            <el-input-number v-model="scorePower" :min="1" :max="10" ></el-input-number>
                        </el-form-item>

                        <!--  最佳搭档 -->
                        <el-form-item label="最佳搭档：">
                            <el-select placeholder="请选择最佳搭档" v-model="bestPartner" filterable multiple
                                       @remove-tag="partnerRemove" @change="partnerChoose">
                                <el-option  v-for="item in heroList" :key="item._id"  :label="item.name"
                                            :value="item.name + ' ' + item.pic[0]" ></el-option>
                            </el-select>
                        </el-form-item>

                        <template v-for="(item, index) in bestPartner">
                            <el-form-item :label="item.split(' ')[0] + '：'" :key="index">
                                <el-input v-model="bestPartnerDescribe[index]" type="textarea" :autosize="{ minRows: 2, maxRows: 9}"></el-input>
                            </el-form-item>
                        </template>

                        <!-- 被谁克制 -->
                        <el-form-item label="被谁克制：">
                            <el-select placeholder="请选择被克制的英雄" v-model="restrainBy" filterable multiple
                                       @change="restrainByChoose" @remove-tag="restrainByRemove">
                                <el-option  v-for="item in heroList" :key="item._id" :value="item.name + ' ' + item.pic[0]" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>

                        <template v-for="(item, index) in restrainBy">
                            <el-form-item :label="item.split(' ')[0] + '：'" :key="'by'+index">
                                <el-input v-model="restrainByDescribe[index]" type="textarea" :autosize="{ minRows: 2, maxRows: 9}"></el-input>
                            </el-form-item>
                        </template>

                        <!--  克制谁 -->
                        <el-form-item label="克制谁：">
                            <el-select placeholder="请选择克制的英雄" v-model="restrainTo" filterable multiple
                                       @change="restrainToChoose" @remove-tag="restrainToRemove">
                                <el-option  v-for="item in heroList" :key="item._id" :value="item.name + ' ' + item.pic[0]" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>

                        <template v-for="(item, index) in restrainTo">
                            <el-form-item :label="item.split(' ')[0] + '：'" :key="'by'+index">
                                <el-input v-model="restrainToDescribe[index]" type="textarea" :autosize="{ minRows: 2, maxRows: 9}"></el-input>
                            </el-form-item>
                        </template>

                        <!--  使用技巧 -->
                        <el-form-item label="使用技巧：">
                            <el-input type="textarea" v-model="useSkill" :autosize="{ minRows: 2, maxRows: 9}"></el-input>
                        </el-form-item>

                        <!--  对抗技巧 -->
                        <el-form-item label="对抗技巧：">
                            <el-input type="textarea" v-model="fightSkill" :autosize="{ minRows: 2, maxRows: 9}"></el-input>
                        </el-form-item>

                        <!--  团战思路 -->
                        <el-form-item label="团战思路：">
                            <el-input type="textarea" v-model="fightThink" :autosize="{ minRows: 2, maxRows: 9}"></el-input>
                        </el-form-item>

                        <!-- 一图识英雄 -->
                        <el-form-item label="一图识英雄：">
                            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                                       :headers="getAuthHeaders()" :show-file-list="false" :on-success="res => this.onePic = res.url">
                                <img v-if="onePic" :src="onePic" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="content-right">
                    <div class="title">
                        <i class="el-icon-reading"></i>
                        技能描述
                    </div>
                    <el-form label-width="100px" style="padding-left: 70px">
                        <template v-for="(item, index) in skillList">
                            <div :key="index">
                                <div class="fw700">{{item.title}}</div>
                                <el-form-item label="名称：">
                                    <el-input v-model="item.name"></el-input>
                                </el-form-item>

                                <el-form-item label="图标：">
                                    <el-upload
                                        class="avatar-uploader"
                                        :action="$http.defaults.baseURL + '/upload'"
                                        :show-file-list="false"
                                        :headers="getAuthHeaders()"
                                        :on-success="res => item.pic = res.url" >
                                        <img v-if="item.pic" :src="item.pic" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>

                                <el-form-item label="冷却：">
                                    <el-input v-model="item.cooling"></el-input>
                                </el-form-item>

                                <el-form-item label="消耗：">
                                    <el-input v-model="item.consume"></el-input>
                                </el-form-item>

                                <el-form-item label="描述：" >
                                    <el-input type="textarea" v-model="item.describe" :autosize="{ minRows: 2, maxRows: 9}"></el-input>
                                </el-form-item>
                            </div>
                        </template>

                        <div class="addSkill" @click="addSkill" v-if="isAddSkill">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span style="margin-left: 6px">添加技能</span>
                        </div>

                        <div class="addSkill" @click="deleteSkill" v-else>
                            <i class="el-icon-remove-outline"></i>
                            <span style="margin-left: 6px">删除技能</span>
                        </div>

                        <el-form-item label="主升技能：">
                            <el-select v-model="mainAdd" placeholder="请选择主升技能">
                                <el-option v-for="(item, index) in skillList" :key="index" :label="item.name" :value="item.name">
                                    <span style="float: left">{{item.title}}</span>
                                    <span style="float: right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="附升技能：">
                            <el-select v-model="secondAdd" placeholder="请选择副升技能">
                                <el-option v-for="(item, index) in skillList" :key="index" :label="item.name" :value="item.name">
                                    <span style="float: left">{{item.title}}</span>
                                    <span style="float: right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>

                </div>
            </div>

        </div>

        <!--底部按钮-->
        <div class="button-bg">
            <div class="button-control">
                <el-button style="color: #666;" v-if="$route.name === 'heroEdit' " @click="deleteHero">删除</el-button>
                <el-button style="color: #666;" @click="toCancel">取 消</el-button>
                <el-button type="primary" @click="submit()">保 存</el-button>
            </div>
        </div>
        <!-- 新增获取方式弹窗 -->
        <get-way-new v-model="popupShow" v-if="popupShow" @success="newWaySuccess" type="heroGetWay"></get-way-new>

        <!-- 新增分类弹窗 -->
        <classify-new v-model="classifyNewShow" v-if="classifyNewShow" @success="newClassifySuccess"></classify-new>

    </div>
</template>

<script>
    import getWayNew from "./components/getWayNew";
    import classifyNew from "./components/classifyNew";
    import AlarmText from "../components/AlarmText";
    export default {
        name: "heroNew",
        components: {
            getWayNew,
            classifyNew,
            AlarmText
        },
        data(){
            return {
                pic: '',
                picError: false,
                onePic: '',    //一图识英雄
                date: '',           //上架时间
                dateError: false,
                way: [],                //获取方式
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

                livePower: null,
                attackPower: null,
                skillPower: null,
                scorePower: null,

                heroSkill: [],
                heroSkillList: [],
                useSkill: '',
                fightSkill: '',
                fightThink: '',

                bestPartner: [],
                bestPartnerNum: 0,
                bestPartnerMiddle: [],
                bestPartnerDescribe: [],

                restrainBy: [],
                restrainByNum: 0,
                restrainByMiddle: [],
                restrainByDescribe: [],

                restrainTo: [],
                restrainToNum: 0,
                restrainToMiddle: [],
                restrainToDescribe: [],

                heroList: [],

                skillList: [
                    {
                        title: '被动',
                        name: '',
                        pic: '',
                        cooling: '',
                        consume: '',
                        describe: '',
                    },
                    {
                        title: '技能一',
                        name: '',
                        pic: '',
                        cooling: '',
                        consume: '',
                        describe: '',
                    },
                    {
                        title: '技能二',
                        name: '',
                        pic: '',
                        cooling: '',
                        consume: '',
                        describe: '',
                    },
                    {
                        title: '技能三',
                        name: '',
                        pic: '',
                        cooling: '',
                        consume: '',
                        describe: '',
                    },
                ],             //技能组合

                isAddSkill: true,

                mainAdd: '',
                secondAdd: '',
            }
        },
        async created() {
            this.getWayList();
            this.getClassify();
            this.getHeroList();
            this.getHeroSkill();
            if(this.$route.params.id){
                let res = await this.$http.get(`rest/heroInfo/heroId/${this.$route.params.id}`)
                let item = res.data;
                this.pic = item.pic;
                this.name = item.name;
                this.way = item.way;
                this.chip = item.chip;
                this.classify = item.classify;
                this.coupon = item.coupon;
                this.date = item.date;
                this.money = item.money;
                this.livePower = item.livePower;
                this.attackPower = item.attackPower;
                this.skillPower  = item.skillPower;
                this.scorePower = item.scorePower;
                this.skillList = item.skillList;
                this.heroSkill = item.heroSkill;
                this.bestPartner = item.bestPartner;
                this.bestPartnerDescribe = item.bestPartnerDescribe;
                this.restrainBy = item.restrainBy;
                this.restrainByDescribe = item.restrainByDescribe;
                this.restrainTo = item.restrainTo;
                this.restrainToDescribe = item.restrainToDescribe;
                this.useSkill = item.useSkill;
                this.fightSkill = item.fightSkill;
                this.fightThink = item.fightThink;
                this.mainAdd = item.mainAdd;
                this.secondAdd = item.secondAdd;
                this.onePic = item.onePic;
                this.wayChoose(this.way);
            }
            if(this.skillList.length === 5){
                this.isAddSkill = false;
            }
        },
        watch: {
            async "$route.name"(){
                if(this.$route.params.id){
                    let res = await this.$http.get(`rest/heroInfo/heroId/${this.$route.params.id}`)
                    let item = res.data;
                    this.pic = item.pic;
                    this.name = item.name;
                    this.way = item.way;
                    this.chip = item.chip;
                    this.classify = item.classify;
                    this.coupon = item.coupon;
                    this.date = item.date;
                    this.money = item.money;
                    this.livePower = item.livePower;
                    this.attackPower = item.attackPower;
                    this.skillPower  = item.skillPower;
                    this.scorePower = item.scorePower;
                    this.skillList = item.skillList;
                    this.heroSkill = item.heroSkill;
                    this.bestPartner = item.bestPartner;
                    this.bestPartnerDescribe = item.bestPartnerDescribe;
                    this.restrainBy = item.restrainBy;
                    this.restrainByDescribe = item.restrainByDescribe;
                    this.restrainTo = item.restrainTo;
                    this.restrainToDescribe = item.restrainToDescribe;
                    this.useSkill = item.useSkill;
                    this.fightSkill = item.fightSkill;
                    this.fightThink = item.fightThink;
                    this.mainAdd = item.mainAdd;
                    this.secondAdd = item.secondAdd;
                    this.onePic = item.onePic;
                    this.wayChoose(this.way);
                }else{
                    this.pic = '';
                    this.name = '';
                    this.way = [];
                    this.chip = '';
                    this.classify = '';
                    this.coupon = '';
                    this.date = '';
                    this.money = '';
                    this.livePower = '';
                    this.attackPower = '';
                    this.skillPower  = '';
                    this.scorePower = '';
                    this.heroSkill = [];
                    this.bestPartner = [];
                    this.bestPartnerDescribe = [];
                    this.restrainBy = [];
                    this.restrainByDescribe = [];
                    this.restrainTo = [];
                    this.restrainToDescribe = [];
                    this.useSkill = '';
                    this.fightSkill = '';
                    this.fightThink = ''
                    this.mainAdd = '';
                    this.secondAdd = '';
                    this.onePic = '';
                    this.wayChoose(this.way);
                    this.skillList = [
                        {
                            title: '被动',
                            name: '',
                            pic: '',
                            cooling: '',
                            consume: '',
                            describe: '',
                        },
                        {
                            title: '技能一',
                            name: '',
                            pic: '',
                            cooling: '',
                            consume: '',
                            describe: '',
                        },
                        {
                            title: '技能二',
                            name: '',
                            pic: '',
                            cooling: '',
                            consume: '',
                            describe: '',
                        },
                        {
                            title: '技能三',
                            name: '',
                            pic: '',
                            cooling: '',
                            consume: '',
                            describe: '',
                        },
                    ];
                    this.isAddSkill = true;
                }
            }
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

            //获取召唤师技能
            getHeroSkill(){
                this.$http.get('rest/heroSkill').then((res)=>{
                    this.heroSkillList = res.data;
                })
            },

            //获取英雄列表
            getHeroList(){
                this.$http.get('rest/heroInfo').then((res) => {
                    this.heroList = res.data;
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

            //上传照片
            afterUpload(res){
                this.pic = res.url;
            },

            //增加技能
            addSkill(){
                let skillList;
                if(this.skillList.length > 0){
                    skillList = this.skillList;
                    this.skillList = skillList.concat({
                        title: '技能四',
                        name: '',
                        pic: '',
                        cooling: '',
                        consume: '',
                        describe: '',
                    })
                }else{
                    this.skillList = [
                        {
                            title: '被动',
                            name: '',
                            pic: '',
                            cooling: '',
                            consume: '',
                            describe: '',
                        },
                        {
                            title: '技能一',
                            name: '',
                            pic: '',
                            cooling: '',
                            consume: '',
                            describe: '',
                        },
                        {
                            title: '技能二',
                            name: '',
                            pic: '',
                            cooling: '',
                            consume: '',
                            describe: '',
                        },
                        {
                            title: '技能三',
                            name: '',
                            pic: '',
                            cooling: '',
                            consume: '',
                            describe: '',
                        },
                    ];
                }

                if(this.skillList.length === 4){
                    this.isAddSkill = true;
                }else{
                    this.isAddSkill = false;
                }

            },

            //删除技能
            deleteSkill(){
                this.isAddSkill = true;
                this.skillList.pop();
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
                }else{
                    this.moneyWayShow = false;
                }
                if(choose.includes('英雄碎片')){
                    this.chipWayShow = true;
                }else{
                    this.chipWayShow = false;
                }
                if(choose.includes('点券')){
                    this.couponWayShow = true;
                }else{
                    this.couponWayShow = false;
                }
            },

            partnerChoose(choose){
                if(choose.length > this.bestPartnerNum){
                    this.bestPartnerNum ++;
                    for(let i = 0; i < this.bestPartnerNum; i++){
                        this.bestPartnerMiddle[i] = {
                            name: this.bestPartner[i],
                            index: i,
                        }
                    }
                }
            },

            partnerRemove(choose){
                this.bestPartnerNum --;
                for(let i = 0; i < this.bestPartnerMiddle.length; i++){
                    if(choose === this.bestPartnerMiddle[i].name){
                        this.bestPartnerDescribe.splice(i,1);
                        this.bestPartnerMiddle.splice(i,1);
                    }
                }
            },

            //被谁克制下拉框
            restrainByChoose(choose){
                if(choose.length > this.restrainByNum){
                    this.restrainByNum ++;
                    for(let i = 0; i < this.restrainByNum; i++){
                        this.restrainByMiddle[i] = {
                            name: this.restrainBy[i],
                            index: i,
                        }
                    }
                }
            },

            restrainByRemove(choose){
                this.restrainByNum --;
                for(let i = 0; i < this.restrainBy.length; i++){
                    if(choose === this.restrainByMiddle[i].name){
                        this.restrainByDescribe.splice(i,1);
                        this.restrainByMiddle.splice(i,1);
                    }
                }
            },

            //克制谁下拉框
            restrainToChoose(choose){
                if(choose.length > this.restrainToNum){
                    this.restrainToNum ++;
                    for(let i = 0; i < this.restrainToNum; i++){
                        this.restrainToMiddle[i] = {
                            name: this.restrainTo[i],
                            index: i,
                        }
                    }
                }
            },

            restrainToRemove(choose){
                this.restrainToNum --;
                for(let i = 0; i < this.restrainTo.length; i++){
                    if(choose === this.restrainToMiddle[i].name){
                        this.restrainToDescribe.splice(i,1);
                        this.restrainToMiddle.splice(i,1);
                    }
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

            //删除英雄
            deleteHero(){
                this.$confirm(`是否删除英雄--${this.name}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.$http.delete(`rest/heroInfo/${this.$route.params.id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push({name: 'heroList'});
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

            //保存该新英雄时
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
                    livePower: this.livePower,
                    attackPower: this.attackPower,
                    skillPower: this.skillPower,
                    scorePower: this.scorePower,
                    skillList: this.skillList,
                    heroSkill: this.heroSkill,
                    bestPartner: this.bestPartner,
                    bestPartnerDescribe: this.bestPartnerDescribe,
                    restrainBy: this.restrainBy,
                    restrainByDescribe: this.restrainByDescribe,
                    restrainTo: this.restrainTo,
                    restrainToDescribe: this.restrainToDescribe,
                    useSkill: this.useSkill,
                    fightSkill: this.fightSkill,
                    fightThink: this.fightThink,
                    mainAdd: this.mainAdd,
                    secondAdd: this.secondAdd,
                    onePic: this.onePic,
                }

                let res = null;

                if(this.$route.params.id){
                    //编辑英雄
                    res = this.$http.put(`rest/heroInfo/${this.$route.params.id}`, params)
                }else{
                    //新增
                    res = this.$http.post('rest/heroInfo', params);
                }
                this.$message({message: '保存成功', type: "success"});
                this.$router.push({name: 'heroList'});

            }
        }
    }
</script>

<style scoped>
    .hero-new{
        margin-bottom: 90px;
    }

    .title {
        color: #666;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 24px;
    }

    .content{
        display: flex;
        justify-content: flex-start;
        padding-bottom: 20px;
    }

    .content-left{
        width: 50%;
    }

    /*统一输入框的长度*/
    .hero-new >>> .el-input__inner{
        width: 374px;
    }

    .hero-new >>> .el-textarea__inner{
        width: 424px;
        /*min-height: 204px!important;*/
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
        width: 98px;
        line-height: 98px;
        text-align: center;
    }
    .avatar {
        width: 98px;
        display: block;
    }

    .content-right >>> .el-textarea__inner{
        width: 424px;
        /*min-height: 104px!important;*/
    }

    .content-right .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 58px;
        height: 58px;
        line-height: 58px;
        text-align: center;
    }
   .content-right .avatar {
        width: 58px;
        height: 58px;
        display: block;
    }

   .content-right >>> .avatar-uploader .el-upload{
        border-radius: 50%;
   }

   .addSkill{
       margin-bottom: 12px;
       display: flex;
       align-items: center;
       justify-content: flex-end;
       transition: 0.3s;
       cursor: pointer;
   }

    .addSkill >>> .el-icon-circle-plus-outline, .addSkill >>> .el-icon-remove-outline{
       font-size: 34px;
   }

    .addSkill:hover{
       color: #999999;
   }

    .power >>> .el-input__inner{
        width: 100%!important;
        height: 40px!important;
        line-height: 40px!important;
    }
</style>