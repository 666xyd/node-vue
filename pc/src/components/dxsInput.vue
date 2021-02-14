<template>
    <!-- 限制只能输入8位整数位，2位小数位的输入框 -->
    <el-input size="small" v-model="inputValue" :style="{width: width}" @input="getPrice"
              oninput="value=value.replace(/[^\d.]/g,'')" @change="$emit('inputChange')"></el-input>
</template>

<script>
    export default {
        name: "dxsInput",
        props: {
            value: {
                type: [String, Number],
                default: '',
            },
            width: {
                type: String,
                default: '78px',
            },
        },
        watch: {
            value(newValue) {
                this.inputValue = newValue;
            },
            inputValue(newValue) {
                this.$emit('input', newValue);
            }
        },
        data() {
            return {
                inputValue: this.value,
            }
        },
        methods:{
            // 只能输入8位整数位，2位小数位
            getPrice() {
                let temp = (this.inputValue ? this.inputValue : 0).toString();
                if (!temp.includes('.') && temp.length > 8) {
                    this.inputValue = temp.slice(0, 8);
                }
                if (temp.includes('.')) {
                    this.inputValue = temp.split('.')[0].slice(0, 8) + '.' + temp.split('.')[1].slice(0, 2);
                }

                //通知alarm-text显示隐藏
                this.$emit('emptyChange');
            },
        }
    }
</script>

<style scoped>

</style>
