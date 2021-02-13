<template>
    <div class="pagination" v-if="total">
        <!-- pager-count指页码按钮的数量，当总页数超过该值时会折叠，文档规定其应是大于等于5且小于等于21的奇数，默认值是7 -->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page_count"
                layout="total, prev, pager, next, sizes, jumper"
                :pager-count="5"
                background
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            total: {
                type: Number
            },
            page_count: {
                type: Number,
                default: 20
            },
            page: {
                type: Number,
                default: 1
            }
        },
        methods: {
            handleSizeChange(val) {
                this.$emit('update:page_count', val);
                this.$emit('update:page', 1);
                this.$emit('sizeChange',val);
            },
            handleCurrentChange(val) {
                this.$emit('update:page', val);
                this.$emit('currentChange',val);
            },
        }
    }
</script>

<style scoped>
    .pagination >>> .el-pagination__sizes {
        margin-right: 8px;
    }

    .pagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
        border: none;
    }

    .pagination >>> .el-input--mini .el-input__inner,
    .pagination >>> .el-pagination__editor.el-input .el-input__inner {
        height: 28px !important;
    }
</style>
