<template>
  <div id="patchWrapper">
    <div class="header">
      <span class="title">补丁管理</span>
      <div class="header-search-wrapper">
        <span class="header-search-label">集群:</span>
        <el-select
          v-model="searchParams.clusterName"
          size="mini"
          placeholder="请选择"
          clearable
          @change="selectTrigger"
        >
          <el-option label="全部" value="" />
          <el-option
            v-for="(item, i) in clusterOptions"
            :key="i"
            :label="item.displayName"
            :value="item.displayName"
          >
          </el-option>
        </el-select>
        <span class="header-search-label">服务:</span>
        <el-select
          v-model="searchParams.serviceName"
          size="mini"
          placeholder="请选择"
          clearable
          @change="selectTrigger"
        >
          <el-option label="全部" value="" />
          <el-option v-for="(item, i) in serviceOptions" :key="i" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="patchList">
      <div class="top">
        <span class="title">补丁列表</span>
        <div class="operate">
          <el-button
            size="mini"
            style="margin-right: 30px;"
            type="text"
            @click="addPatchVisible = true"
          >
            <i class="iconfont icon-dabuding"></i>
            打补丁
          </el-button>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定删除选中的补丁吗？"
            @onConfirm="handleDelete(getChecked().map(({ id }) => id))"
          >
            <el-button
              slot="reference"
              :disabled="getChecked().length === 0"
              type="text"
              size="mini"
            >
              <i class="iconfont icon-shanchu"></i>
              删除
            </el-button>
          </el-popconfirm>
        </div>
      </div>
      <hs-remote-table
        ref="table"
        :columns="columns"
        showToolbar
        :fetch="{ data: fetch, column: fetchColumn }"
        :default-sort="{ order: 'desc', field: 'createdTime' }"
      >
        <template v-slot:status="{ row }">
          <span
            class="patch-status"
            :style="`background-color:${transformPatchStatus(row.status).color};color:${
              transformPatchStatus(row.status).fontColor
            }
            `"
            >{{ transformPatchStatus(row.status).label }}</span
          >
        </template>
        <template v-slot:rollbackStatus="{ row }">
          <span
            class="patch-status"
            :style="`background-color:${transformrollbackStatus(row.status).color};color:${
              transformrollbackStatus(row.status).fontColor
            }`"
            >{{ transformrollbackStatus(row.status).label }}</span
          >
        </template>
        <template v-slot:operate="{ row }">
          <div>
            <el-popconfirm
              confirmButtonText="确认"
              cancelButtonText="取消"
              title="确定删除选中的补丁吗？"
              @onConfirm="handleDelete([row.id])"
            >
              <template v-slot:reference>
                <el-button type="text" size="small">
                  <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
                    <i class="iconfont icon-shanchu" />
                  </el-tooltip>
                </el-button>
              </template>
            </el-popconfirm>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="
                (row.patchType === '应用补丁' ||
                  (row.patchType !== '应用补丁' && row.status !== 5)) &&
                row.showRecall !== 1
                  ? true
                  : false
              "
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">{{ getRecallDetail(row) }}</div>
              <el-popconfirm
                confirmButtonText="确认"
                cancelButtonText="取消"
                title="确定撤销选中的补丁吗？"
                @onConfirm="recall(row)"
              >
                <template v-slot:reference>
                  <el-button
                    type="text"
                    size="small"
                    :disabled="row.showRecall !== 1 ? true : false || disabledRecall[row.id]"
                  >
                    撤销
                  </el-button>
                </template>
              </el-popconfirm>
            </el-tooltip>
            <el-popconfirm
              v-else
              confirmButtonText="确认"
              cancelButtonText="取消"
              title="确定撤销选中的补丁吗？"
              @onConfirm="recall(row)"
            >
              <template v-slot:reference>
                <el-button
                  type="text"
                  size="small"
                  :disabled="row.showRecall !== 1 ? true : false || disabledRecall[row.id]"
                >
                  撤销
                </el-button>
              </template>
            </el-popconfirm>

            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" @click="handleViewResult(row)">
              <el-tooltip
                class="item"
                effect="dark"
                content="查看结果"
                placement="bottom-start"
                style="outline: unset;"
              >
                <i class="iconfont icon-gengduo"></i>
              </el-tooltip>
            </el-button>
          </div>
        </template>
      </hs-remote-table>
    </div>
    <el-drawer
      ref="drawer"
      size="600px"
      :visible.sync="viewResults"
      custom-class="add-patch-result-drawer"
      :close-on-click-modal="false"
    >
      <PatchResult
        v-if="!showRollback"
        ref="res"
        v-loading="resultLoading"
        :result="patchResult"
        :patchResultId="patchResultId"
        :showRollback="showRollback"
        element-loading-text="正在执行..."
      />
      <PatchResult
        v-if="showRollback"
        ref="res"
        v-loading="resultLoading"
        :result="recallResult"
        :patchResultId="patchResultId"
        :showRollback="showRollback"
        element-loading-text="正在执行..."
      />

      <div class="bottomButton">
        <el-button v-if="!showRollback" @click="redo">
          重新执行
        </el-button>
        <el-button v-if="showRollback" :disabled="disabledContinueRecall" @click="redo">
          继续撤回
        </el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button @click="viewResults = false">
          完成
        </el-button>
      </div>
    </el-drawer>
    <el-dialog v-if="addPatchVisible" width="845px" top="10vh" :visible.sync="addPatchVisible">
      <AddPatch @showDialog="listenEvent"></AddPatch>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import PatchResult from '@src/components/patch/PatchResult';
import AddPatch from '@src/components/patch/AddPatch';
import { ColorEnum } from '@src/constants/color';

export default {
  name: 'PatchManage',
  components: {
    AddPatch,
    PatchResult,
  },
  data() {
    return {
      recallDetail: '',
      disabledRecall: {},
      addPatchResult: [],
      searchVal: '',
      resultLoading: false,
      addPatchVisible: false,
      clusterOptions: [],
      serviceOptions: [],
      searchParams: {
        clusterName: '',
        serviceName: '',
      },
      columns: [
        {
          width: 60,
          type: 'checkbox',
          fixed: 'left',
        },
        {
          title: '补丁ID',
          field: 'id',
          filterType: 'item',
          sortable: true,
          minWidth: 110,
          fixed: 'left',
        },
        {
          title: '用户',
          field: 'executeUser',
          filterType: 'item',
          sortable: true,
          minWidth: 90,
          formatter: ({ cellValue }) => {
            return cellValue || '-';
          },
        },
        {
          title: '补丁名称',
          field: 'patchName',
          filterType: 'item',
          sortable: true,
          minWidth: 130,
        },
        { title: '补丁创建时间', field: 'createdTime', sortable: true, minWidth: 140 },
        {
          title: '补丁类型',
          field: 'patchType',
          filterType: 'item',
          sortable: true,
          minWidth: 130,
        },
        {
          title: '补丁状态',
          field: 'status',
          filterType: 'item',
          sortable: true,
          slotName: 'status',
          minWidth: 130,
          formatter: ({ cellValue }) => {
            switch (cellValue) {
              case 1: {
                return '成功';
              }
              case 2: {
                return '失败';
              }
              case 3: {
                return '部分成功';
              }

              default:
                return '-';
            }
          },
        },
        {
          title: '撤回状态',
          field: 'status',
          filterType: 'item',
          sortable: true,
          slotName: 'rollbackStatus',
          minWidth: 130,
          formatter: ({ cellValue }) => {
            switch (cellValue) {
              case 4: {
                return '初始化';
              }
              case 5: {
                return '撤回成功';
              }
              case 6: {
                return '部分撤回成功';
              }
              case 7: {
                return '撤回失败';
              }
              default:
                return '-';
            }
          },
        },
        {
          title: '是否撤回',
          field: 'isRecall',
          sortable: true,
          filterType: 'item',
          formatter: ({ cellValue }) => {
            if (cellValue) {
              return '是';
            } else {
              return '否';
            }
          },
          minWidth: 120,
        },
        {
          title: '补丁参数',
          field: 'operateArgs',
          sortable: true,
          showOverflow: 'tooltip',
          minWidth: 200,
        },
        {
          title: '是否重启',
          field: 'isRestart',
          sortable: true,
          filterType: 'item',
          minWidth: 130,
          formatter: ({ cellValue }) => {
            return cellValue === 1 ? '是' : '否';
          },
        },
        { title: '操作', field: 'showRecall', slotName: 'operate', minWidth: 150 },
      ],
      // 查看结果
      viewResults: false,
      paramsData: {},
      patchResult: [],
      recallResult: [],
      patchId: null,
      showRollback: false,
      disabledContinueRecall: false,
      patchResultId: 0,
    };
  },
  computed: {
    getRecallDetail() {
      return (row) => {
        if (row.patchType === '应用补丁') {
          return '应用补丁不支持撤销';
        }

        if (row.patchType !== '应用补丁' && row.status !== 5) {
          return '请优先撤回最晚时间的补丁';
        } else return '';
      };
    },
  },
  watch: {
    viewResults: {
      handler(newVal) {
        if (newVal === false) {
          this.$refs.res.clusterChange = false;
        }
      },
      deep: true,
    },
    addPatchVisible(newValue, oldValue) {
      if (!newValue && oldValue) {
        // 关闭时
        this.$refs.table.fetchData();
      }
    },
  },
  mounted() {
    this.getClusterList().then((data) => {
      this.clusterOptions = data;
    });
    this.getServiceList().then((data) => {
      this.serviceOptions = data.services;
    });
  },

  methods: {
    ...mapActions('patch', [
      'getPatchPage',
      'getPatchColumn',
      'deletePatch',
      'createPatch',
      'getServiceList',
      'recallPatch',
    ]),
    ...mapActions('cluster', ['getClusterList']),

    transformPatchStatus(num) {
      switch (num) {
        case 1:
          return { label: '成功', color: ColorEnum.SUCCESS };

        case 2:
          return { label: '失败', color: ColorEnum.ERROR };

        case 3:
          return { label: '部分成功', color: ColorEnum.WARN };
        default:
          return { label: '-', fontColor: '#000' };
      }
    },
    transformrollbackStatus(num) {
      switch (num) {
        case 4:
          return { label: '初始化', color: ColorEnum.PRIMARY_TEXT };

        case 5:
          return { label: '撤回成功', color: ColorEnum.SUCCESS };

        case 6:
          return { label: '部分撤回成功', color: ColorEnum.WARN };

        case 7:
          return { label: '撤回失败', color: ColorEnum.ERROR };
        default:
          return { label: '-', fontColor: '#000' };
      }
    },
    recall(row) {
      this.disabledRecall[row.id] = true;
      let paramsData = JSON.parse(row.operateArgs);
      paramsData.patchId = row.id;
      let resultVoList = JSON.parse(row.resultJson);
      this.recallPatch({
        ...paramsData,
        resultVoList,
      })
        .then((res) => {
          this.$refs.table.fetchData();
        })
        .finally(() => {
          this.disabledRecall[row.id] = false;
        });
    },
    fetch(params) {
      const searchParams = this.searchParams;
      const baseParams = {
        ascOrDesc: 'desc',
        orderBy: 'created_time',
      };

      return this.getPatchPage(Object.assign(baseParams, searchParams, params));
    },
    fetchColumn(params) {
      const searchParams = this.searchParams;
      const baseParams = {
        ascOrDesc: 'desc',
        orderBy: 'created_time',
      };

      return this.getPatchColumn(Object.assign(baseParams, searchParams, params));
    },
    listenEvent(val) {
      this.addPatchVisible = val;
    },
    // select组件实现搜索功能
    selectTrigger() {
      this.$refs.table.fetchData({ page: 1 });
    },
    // 删除补丁操作
    handleDelete(ids) {
      this.deletePatch(ids).then(() => {
        this.$refs.table.fetchData();
      });
    },
    getChecked() {
      return this.$refs.table?.checked || [];
    },
    handleViewResult(row) {
      // 查看结果
      this.paramsData = JSON.parse(row.operateArgs);
      this.paramsData.patchId = row.id;
      this.patchResult = JSON.parse(row.resultJson);
      this.recallResult = JSON.parse(row.recallJson);
      this.patchResultId = row.id;
      this.viewResults = true;
      this.showRollback = row['isRecall'] === 1 ? true : false;
      this.disabledContinueRecall = row.showRecall !== 1 ? true : false;
    },
    redo() {
      let ck = this.$refs.res.list.reduce((acc, cur) => {
        const hostList = cur.hostList.filter((item) => item.checked);
        if (hostList.length !== 0) {
          acc.push({ ...cur, hostList });
        }
        return acc;
      }, []);
      if (ck.length === 0) {
        this.$message('请至少选择一个主机！');
      } else {
        this.patchResult = [];
        this.resultLoading = true;
        this.createPatch({
          ...this.paramsData,
          resultVoList: this.$refs.res.list.reduce((acc, cur) => {
            const hostList = cur.hostList.filter((item) => item.checked);
            if (hostList.length !== 0) {
              acc.push({ ...cur, hostList });
            }
            return acc;
          }, []),
        })
          .then((res) => {
            this.patchResult = res.resultJson;
            this.patchId = res.patchId;
          })
          .finally(() => {
            this.resultLoading = false;
          });
      }
    },
  },
};
</script>
<style lang="less">
.el-tooltip__popper {
  .el-input {
    margin-bottom: 10px;
  }
  .el-checkbox-group {
    margin-top: -14px;
    overflow-y: auto;
    height: 100px;
    .el-checkbox {
      display: block;
    }
  }
}

#patchWrapper {
  position: relative;
  height: 100%;
  padding: 30px 95px 20px 95px;
  font-size: 14px;
  color: black;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .header-search-wrapper {
      display: flex;
      align-items: center;

      .header-search-label {
        margin: 0 8px 0 32px;
      }
    }
  }

  .patchList {
    background-color: #fff;
    margin-top: 20px;

    .top {
      height: 50px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 14px;
        font-weight: 700;
      }

      .operate {
        font-size: 14px;
        margin-right: 35px;
        /*display: flex;*/
        /*margin-left: auto;*/
      }
    }
  }

  .el-pagination {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
  }

  .el-dialog {
    .el-dialog__header {
      height: 0;
      position: absolute;
      right: 10px;
      top: 0;

      .el-dialog__close {
        font-size: 20px;
        color: #fff;
      }
    }
    .el-dialog__body {
      margin: 0 !important;
      padding: 0 !important;
    }

    .el-dialog__footer {
      padding: 0;

      .dialog-footer {
        display: flex;
        align-items: center;
        border-top: 1px solid #cdd2d6;
        height: 53px;
        line-height: 53px;
        width: 100%;

        .btn {
          display: inline-block;
          width: 50%;
          text-align: center;
          cursor: pointer;
          border: unset;
          border-radius: unset;
          height: 52px;
        }
      }
    }
  }
  .el-drawer__body {
    display: flex;
    flex-direction: column;
    height: 100%;

    .patch-result-wrapper {
      flex: 1 0 auto;
      height: 0;
    }

    .bottomButton {
      flex: 0 0 52px;
      z-index: 999;
      display: flex;
      align-items: center;
      border-top: 1px solid rgb(231, 227, 227);
      background-color: #fff;

      .el-button {
        display: inline-block;
        width: 50%;
        text-align: center;
        cursor: pointer;
        border: unset;
        border-radius: unset;
        height: 52px;
      }
    }
  }

  .patch-status {
    display: inline-block;
    padding: 0 10px;
    color: #fff;
    border-radius: 4px;
    width: 80px;
    box-sizing: content-box;
    text-align: center;
  }
}
</style>
