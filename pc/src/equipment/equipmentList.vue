<template>
    <div class="equipment-list initMain">
        <div class="list-content">
            <div class="list-form al-center">
                <AddButton title="新增装备" :cmb="false" @add="add"></AddButton>
                <Search title="搜索装备名称" v-model="searchText" @search="search()"></Search>
            </div>
        </div>

        <div class="list-main flex">
            <!-- 左侧装备分类 -->
            <div class="classify">
                <div class="equipment-type">
                    <div class="equipment-type-title">装备分类</div>
                    <div style="overflow: hidden">
                        <transition name="fade">
                            <!-- 树形控件 -->
                            <el-tree ref="elTree" node-key="id" :data="equipmentTypeList" :props="defaultProps"
                                     @node-click="handleNodeClick"></el-tree>
                        </transition>
                    </div>
                </div>
            </div>

            <!-- 右侧装备列表 -->
            <div style="height: calc(100% - 60px);overflow-y: auto;width: 100%;margin-right: -20px " ref="scroll" v-if="equipmentList.length !== 0">
                <div class="list">
                    <template v-for="(item, index) in equipmentList">
                        <div :key="index" class="equipmentInfo">
                            <el-popover placement="bottom-start" width="260" trigger="hover" :close-delay="10">
                                <div class="hoverInfo">
                                    <div class="al-center" style="margin-bottom: 20px">
                                        <img :src="item.pic" style="width: 60px; border-radius: 6px;">
                                        <div style="margin-left: 18px">
                                            <p class="fz20" style="font-weight: bold;color: #00c191">{{item.name}}</p>
                                            <p style="margin: 6px 0 0 0; color: #DC9E32 ">售价：{{item.money}}</p>
                                        </div>
                                    </div>

                                    <template v-for="(effect, index) in item.effect">
                                        <p :key="index" v-if="effect.value" style="margin-top: 3px">+{{effect.value}} {{effect.text}}</p>
                                    </template>

                                    <div style="margin: 20px 0;white-space: pre-line;">{{ item.describe }}</div>

                                    <el-button size="small" plain type="primary" @click="toEdit(item)">编辑</el-button>
                                    <el-button size="small" plain type="primary" @click="toDelete(item)">删除</el-button>
                                </div>
                                <img :src="item.pic" slot="reference">
                            </el-popover>
                            <div class="fz14" style="margin-bottom: 6px">{{item.name}}</div>
                        </div>
                    </template>
                </div>
            </div>

            <div v-else class="empty">暂无该分类的装备</div>
        </div>
    </div>
</template>

<script>
    import AddButton from "../components/AddButton";
    import Search from "../components/Search";
    export default {
        name: "equipmentList",
        data(){
            return{
                searchText: '',
                equipmentTypeList: [{name: "全部", id: 0}],
                defaultProps: {children: 'child', label: 'name'},
                id: null,
                params: {
                    category_id: 0,
                },
                page_count: this.$store.state.per_num,   //每页数据条数
                page: 1,     //页码
                equipmentList: [],
            }
        },
        components: {
            AddButton,
            Search
        },
        created() {
            this.getClassifyList();
            this.getEquipmentList();
        },
        methods: {
            //获取装备列表
            getEquipmentList(){
                this.$http.get('rest/equipmentInfo').then((res)=>{
                    this.equipmentList = res.data;
                    // for(let i = 0; i < this.equipmentList.length; i++){
                    //     this.equipmentList[i].describe = this.equipmentList[i].describe.replace(/\n/,"<br/>");
                    // }
                })
            },

            //获取装备分类列表
            getClassifyList(){
                this.$http.get('rest/equipmentClassify').then((res)=>{
                    this.equipmentTypeList = [{name: "全部", id: 0}];
                    for(let i = 0 ; i < res.data.length; i++){
                        this.equipmentTypeList.push({name: res.data[i].name, id: i + 1});
                    }
                    this.$nextTick(() => {
                        this.$refs.elTree && this.$refs.elTree.setCurrentKey(this.params.category_id)
                    })
                })
            },

            //新增装备
            add(){
                this.$router.push({name: 'equipmentNew'});
            },

            //搜索框搜索
            search(){
                //这里需要nexttick，不用的话点清空搜索内容时，仍然停留在搜索内容的结果
                this.$nextTick(()=>{
                    if(this.searchText){
                        //有输入内容
                        this.$http.get(`rest/equipmentInfo/equipmentName/${this.searchText}`).then((res)=>{
                            this.equipmentList = res.data;
                            this.getClassifyList(); //这一步的目的主要是为了让树形回到‘全部’
                        })
                    }else{
                        //内容清空
                        this.getEquipmentList();
                    }
                })
            },

            //点击树形控件
            handleNodeClick(val) {
                this.searchText = '';
                if(val.id === 0){
                    //点击的是'全部'
                    this.getEquipmentList()
                }else {
                    this.$http(`rest/equipmentInfo/equipmentClassify/${val.name}`).then((res)=>{
                        this.equipmentList = res.data;
                    })
                }
            },

            //编辑
            toEdit(item){
                this.$router.push({name: 'equipmentEdit', params: {id: item._id}});
            },

            //删除
            toDelete(item){
                this.$confirm(`是否删除装备--${item.name}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.$http.delete(`rest/equipmentInfo/${item._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getEquipmentList();
                })
            }
        },
    }
</script>

<style scoped>

    .list-form{
        margin-bottom: 20px;
    }

    /*商品分类*/
    .classify{
        min-width: 156px;
        width: 156px;
        overflow: hidden;
        margin-right: 20px;
        margin-bottom: 18px;
    }

    .equipment-type {
        width: 156px;
        overflow-x: hidden;
        overflow-y: auto;
        /*隐藏滚动条*/
        margin-right: -40px;
        padding-bottom: 24px;
        box-sizing: border-box;
        background: #F5F7FA;
        border-radius: 4px 4px 0 0;
    }

    /*隐藏时的样式*/
    .fade-enter, .fade-leave-to {
        transform: translate3d(0, -2rem, 0);
    }

    .equipment-type-title {
        width: 100%;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        background: #F5F7FA;
        padding: 17px 16px;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .list-main{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .equipment-list{
        height: calc(100% - 180px);
    }

    /*树形控件*/
    .equipment-list >>> .el-tree {
        background: #F5F7FA;
    }

    .equipment-list >>> .el-tree-node {
        white-space: normal;
    }

    .equipment-list >>> .el-tree-node__content {
        height: auto;
        padding: 10px 8px;
    }

    .equipment-list >>> .el-tree-node__content:hover {
        background: #FFF;
        color: #00C191;
        font-weight: bold;
    }

    .equipment-list >>> .el-tree .is-current {
        color: #00C191;
        font-weight: bold;
    }

    .equipment-list >>> .el-tree-node__expand-icon {
        padding: 0 6px 0 3px;
    }

    .equipmentInfo img{
        border-radius: 12px 0 12px 0;
        border: 2px solid #00c191;
        cursor: pointer;
        width: 87px;
        height: 87px;
        transition: all 0.6s;
    }

    .empty{
        width: 100%;
        background-color: #F5F7FA;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
    }

    .list{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-row-gap: 28px;
        justify-items: center;
        align-items: baseline;
        text-align: center;
    }

    .hoverInfo{
        color: #599FE0;
    }

    .hoverInfo >>> .el-button--primary{
        background-color: white!important;
    }

    .hoverInfo >>> .el-button--primary:hover{
        background-color: #409eff!important;
    }
</style>