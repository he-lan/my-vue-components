<template>
    <el-select v-model="data" placeholder="请选择" multiple collapse-tags size="mini">
        <el-option label="全部" value="all" />
        <el-option v-for="(item, i) in childOptions" :key="i" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script>
export default {
    name: 'SelectAllTwo',
    props: {
        value: {
            type: Array,
            default() {
                return [];
            }
        },
        childOptions: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            data: []
        };
    },
    watch: {
        data: {
            handler(newValue = [], oldValue = []) {
                if (
                    (newValue.includes('all') && !oldValue.includes('all')) ||
                    (!newValue.includes('all') && newValue.length === this.childOptions.length)
                ) {
                    this.data = ['all', ...this.childOptions.map(({ value }) => value)];
                }
                if (
                    !newValue.includes('all') &&
                    oldValue.includes('all') &&
                    newValue.length === this.childOptions.length
                ) {
                    this.data = [];
                }
                if (
                    newValue.includes('all') &&
                    oldValue.includes('all') &&
                    newValue.length === this.childOptions.length
                ) {
                    this.data = newValue.filter((item) => item !== 'all');
                }
                this.$emit('input', this.data);
            },
            immediate: true
        },
        value: {
            handler(newValue) {
                this.data = newValue;
            },
            immediate: true
        }
    }
};
</script>

<style scoped></style>