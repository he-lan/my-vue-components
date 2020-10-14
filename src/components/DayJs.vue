<template>
    <div class="block">
        <div class="one">
            <div class="title1">设置今天之前的可选时间段</div>
            <el-date-picker size="mini" v-model="time" :picker-options="{
                disabledDate :(date)  => disabledDate1(date),
              }" type="date" placeholder="选择日期">
            </el-date-picker>
        </div>
        <div class="title2">
            选择时间段
        </div>
        <div class="two">
            <el-date-picker size="mini" v-model="startTime" :picker-options="{
                disabledDate :(date)  => disabledDate2(date,'end'),
              }" type="date" placeholder="选择日期">
            </el-date-picker>
            <div>-</div>
            <el-date-picker size="mini" v-model="endTime" :picker-options="{
              disabledDate: (date) => disabledDate2(date,'start'),
            }" type="date" placeholder="选择日期">
            </el-date-picker>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                time: '',
                startTime: this.$dayjs().format("YYYY-MM-DD "),
                endTime: this.$dayjs().format("YYYY-MM-DD "),
            }
        },
        methods: {
            disabledDate1(time) {
                return this.$dayjs().add(-1, "days").isBefore(time) || this.$dayjs().subtract(7, "days").isAfter(time);
            },
            disabledDate2(date, key) {
                if (key === "start") {
                    return this.$dayjs().isBefore(date) || this.$dayjs(this.startTime).isAfter(date);
                }
                if (key === "end") {
                    return this.$dayjs().isBefore(date) || this.$dayjs(this.endTime).isBefore(date);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .one {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title1 {
        margin-bottom: 20px;
    }
    }
 
    .title2 {
        margin-top: 50px;
    }
    .two {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
</style>