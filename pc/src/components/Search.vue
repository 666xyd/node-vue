<template>
    <el-input v-model="searchState" :placeholder="`${title}`" size="small" class="search"
              @change="search" @blur="search" clearable>
        <i class="el-icon-search el-input__icon" slot="suffix" style="height: 32px;cursor: pointer"></i>
    </el-input>
</template>

<script>
    import debounce from 'lodash/debounce'
    export default {
        name: "Search",
        data() {
            return {
                searchState: this.value,
            }
        },
        watch: {
            value(newValue) {
                this.searchState = newValue;
            },
            searchState(newValue) {
                this.$emit('input', newValue);
            }
        },
        props: {
            title: String,
            value: String,
        },
        methods: {
            search: debounce(function () {
                //也许你看到外层调用的search要setTimeout会很奇怪，是因为外层收到emit时，有时searchState还没有更新
                this.$emit('search')
            }, 500, {'leading': true, 'trailing': false}),
        }
    }
</script>

<style scoped>
    .search {
        margin-left: 8px;
        width: 185px;
        height: 32px;
    }
</style>
