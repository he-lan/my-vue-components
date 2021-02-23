<template>
  <div class="home-wrapper">
    <el-container>
      <el-header>Project Functions</el-header>
      <el-container class="main-container">
        <el-aside width="200px">
          <el-menu
            default-active="/dayjs"
            class="el-menu-vertical-demo"
            @select="select"
          >
          <el-menu-item index="/echarts">
              <i class="el-icon-goods"></i>
              <span slot="title">echarts图</span>
            </el-menu-item>
            <el-menu-item index="/dayjs">
              <i class="el-icon-goods"></i>
              <span slot="title">DayJs</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>SelectAll</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/selectall/one"
                  >增加option组件</el-menu-item
                >
                <el-menu-item index="/selectall/two">增加数据选项</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>vxe-table</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/table/hasPage"
                  >带分页的table</el-menu-item
                >
                <el-menu-item index="/table/hasNoPage"
                  >不带分页的table</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="/table">
              <i class="el-icon-document"></i>
              <span slot="title">vxe-table</span>
            </el-menu-item> -->
            <el-menu-item index="/dynamicTable">
              <i class="el-icon-setting"></i>
              <span slot="title">动态表格</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {mapState,mapGetters} from 'vuex';
export default {
  name: "Home",
  data() {
    return {
      msg: "111",
    };
  },
  computed:{
    ...mapState({
      count:state=>state.count
    }),
    ...mapGetters({
      filterArr11:'filterArr'
    })

  },
  mounted(){
    console.log(this.count)
    this.$store.commit('increment',10);
    // this.$store.commit(types.SET_INCREMENT,10);

    console.log(this.$store.state.count,'count')
   console.log(this.$store.getters.filterArr); 
   console.log(this.filterArr11)
  },
  methods: {
 
    select(key) {
      this.$router.push(key);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  .el-header {
    background-color: white;
    color: #333;
    line-height: 60px;
    flex: 0 0 60px;
    border-bottom: 1px solid rgb(228, 224, 224);
  }

  .main-container {
    flex: 1;

    .el-aside {
      background-color: white;
      color: #333;
      text-align: center;

      .el-menu {
       

        /deep/ .el-menu-item {
          padding-left: 30px !important;
          display: flex;
          justify-content: flex-start;

          i {
            line-height: 56px;
          }
        }

        .is-active {
          background-color: #fff;
        }
      }

      .el-submenu {
        padding-left: 0px !important;

        /deep/ .el-submenu__title {
          padding-left: 30px !important;
          padding-top: 0 !important;
          display: flex;
          justify-content: flex-start;

          i {
            line-height: 56px;
          }

          /deep/ .el-submenu__icon-arrow {
            top: 15% !important;
            right: 57px !important;
          }
        }

        /deep/ .el-menu {
          .el-menu-item-group__title {
            padding: 0 !important;
            height: 0 !important;
          }
        }
      }
    }

    .el-main {
         background-color: #F6F5FA;

      color: #333;
      text-align: center;
    }
  }
}
</style>
