<template>
    <div class="table-has-no-page-wraper">
        <no-page ref="table" :columns="columns" :fetch="{data:fetch}" :loading="true">
            <template v-slot:operate="{row}">
                <el-button @click="deleteRow(row.id)">删除</el-button>
            </template>
        </no-page>
    </div>
</template>

<script>
    import NoPage from './subComponents/NoPage.vue'
    export default {
        components: {
            NoPage,
        },
        data() {
            return {
                columns: [
                    {
                        width: 60,
                        type: 'checkbox',
                        fixed: 'left',
                    },

                    {
                        title: 'Id',
                        field: 'id',
                        width: 110,
                        fixed: 'left'
                    },
                    {
                        title: '时间',
                        field: 'time',
                        sortable: true,
                        width: 200,
                        filterType: 'item',

                    },
                    {
                        title: '姓名',
                        field: 'name',
                        width: 210,
                        sortable: true,
                        formatter: ({ cellValue }) => {
                            return cellValue || '-'
                        }
                    },
                    {
                        title: 'love',
                        field: 'love',
                        width: 210,                     
                    },
                   
                    {
                        title: '状态',
                        field: 'status',

                        width: 300,
                        formatter: ({ cellValue }) => {
                            switch (cellValue) {
                                case 1: {
                                    return '成功';
                                }
                                case 2: {
                                    return '失败'
                                }
                                case 3: {
                                    return '部分成功'
                                }
                                case 4: {
                                    return '-'
                                }
                                default: return ''
                            }
                        }
                    },
                    {
                        title: '操作',
                        field: 'operate',
                        slotName: 'operate',
                        minWidth: 200
                    }

                ]
            }
        },
        methods: {
            deleteRow(row) {
                console.log(row, 'delete');
            },
            fetch() {

                let list = [{ id: 1, name: 'adda', time: '2020-09-27',love:'panda', status: 1 },
                { id: 2, name: 'fssqwqw', time: '2020-09-28', love:'eating',status: 2 },
                { id: 3, name: 'asfffx', time: '2020-09-26', love:'singing',status: 1 },
                { id: 4, name: 'marysds', time: '2020-09-22',love:'dancing', status: 3 },
                { id: 5, name: 'lindads', time: '2020-09-30',love:'panda', status: 3 },
                { id: 6, name: 'tony', time: '2020-09-28', love:'panda',status: 4 },
                { id: 7, name: 'dsffddd', time: '2020-10-2',love:'cat', status: 2 },
                { id: 8, name: 'fxcxv', time: '2020-10-12',love:'dog', status: 3 },
                { id: 9, name: 'bgfgf', time: '2020-10-09',love:'writing', status: 3 },
                { id: 10, name: 'addgdgda', time: '2020-09-22',love:'reading', status: 1 },
                { id: 11, name: 'bbbbbbsd', time: '2020-10-11',love:'reading', status: 1 },
                { id: 12, name: 'bgdsfa', time: '2020-10-08',love:'dancing', status: 2 }];
                return Promise.resolve(list)
            },
            fetchColumn() {
                let list = [{ id: 1, name: 'adda', time: '2020-09-27', status: 1 },
                { id: 2, name: 'fss', time: '2020-09-28', status: 2 },
                { id: 3, name: 'asfffx', time: '2020-09-26', status: 1 },
                { id: 4, name: 'mary', time: '2020-09-22', status: 3 },
                { id: 5, name: 'linda', time: '2020-09-30', status: 3 },
                { id: 6, name: 'tony', time: '2020-09-28', status: 4 },
                { id: 7, name: 'dsffddd', time: '2020-10-2', status: 2 },
                { id: 8, name: 'fxcxv', time: '2020-10-12', status: 3 },
                { id: 9, name: 'bgfgf', time: '2020-10-09', status: 3 },
                { id: 10, name: 'addgdgda', time: '2020-09-22', status: 1 },
                { id: 11, name: 'bbbbbbsd', time: '2020-10-11', status: 1 },
                { id: 12, name: 'bgdsfa', time: '2020-10-08', status: 2 }];
                let total = list.length;
                return Promise.resolve({
                    list: list,
                    total: total
                })
            }
        }
    }
</script>

<style lang="scss" scoped></style>