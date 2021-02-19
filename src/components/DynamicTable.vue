<template>
  <div>
    <vxe-table
    border
    ref="xTable"
    height="300"
    :print-config="{}"
    :loading="loading"
    :data="tableData"
    @custom="toolbarCustomEvent">
    <vxe-table-column type="seq" width="60"></vxe-table-column>
    <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
    <vxe-table-column field="role" title="Role"></vxe-table-column>
    <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
    <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
    <vxe-table-column field="rate" title="Rate"></vxe-table-column>
  </vxe-table>

  <div>
    <p>工具栏位置随意放</p>
      <vxe-toolbar
        custom
        print
        ref="xToolbar"
        :buttons="toolbarButtons"
        :refresh="{query: findList}">
      </vxe-toolbar>
    <p>工具栏位置随意放</p>
  </div>
  </div>

</template>

<script>
    export default {
      data () {
            return {
              loading: false,
              tableData: [],
              toolbarButtons: [
                { code: 'btn1', name: 'app.body.button.insert' },
                {
                  name: '下拉按钮',
                  dropdowns: [
                    { name: '按钮111', code: 'btn2' },
                    { name: '按钮222', code: 'btn3' }
                  ]
                }
              ]
            }
          },
          created () {
            this.$nextTick(() => {
              // 手动将表格和工具栏进行关联
              this.$refs.xTable.connect(this.$refs.xToolbar)
            })
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  this.tableData = window.MOCK_DATA_LIST?.slice(0, 20)
                  this.loading = false
                  resolve()
                }, 300)
              })
            },
            toolbarCustomEvent (params) {
              const visibleColumn = this.$refs.xTable.getColumns()
              switch (params.type) {
                case 'confirm': {
                  this.$XModal.message({ message: `点击了确认，显示为 ${visibleColumn.length} 列`, status: 'info' })
                  break
                }
                case 'reset': {
                  this.$XModal.message({ message: `点击了重置，显示为 ${visibleColumn.length} 列`, status: 'info' })
                  break
                }
                case 'close': {
                  this.$XModal.message({ message: `关闭了面板，显示为 ${visibleColumn.length} 列`, status: 'info' })
                  break
                }
              }
            }
          }
              // tableColumn: [
              //   { type: 'checkbox', width: 50 },
              //   { field: 'seq', title: '排序', width: 80, editRender: { name: 'input' } },
              //   { field: 'key', title: '列键值', width: 100, editRender: { name: 'input' } },
              //   { field: 'name', title: '列名称', width: 100, editRender: { name: 'input' } },
              //   { field: 'type', title: '列类型', width: 120, editRender: { name: '$select', options: typeList, props: { clearable: true } } },
              //   { field: 'width', title: '列宽度', width: 100, editRender: { name: 'input', attrs: { placeholder: '*,*px,*%' } } },
              //   { field: 'link', title: '是否链接', width: 150, editRender: { name: 'input' } },
              //   { field: 'isEdit', title: '是否编辑', width: 100, cellRender: { name: '$switch' } },
              //   { field: 'required', title: '是否必填', width: 140, cellRender: { name: '$switch' } },
              //   { field: 'validator', title: '校验规则', width: 140, editRender: { name: 'input' } },
              //   { field: 'validMsg', title: '校验提示消息', width: 150, editRender: { name: 'input' } },
              //   { field: 'describe', title: '描述', width: 200, showOverflow: true, editRender: { name: 'input' } },
              //   { field: 'createTime', title: '创建时间', width: 140, showOverflow: true },
              //   { field: 'updateTime', title: '更新时间', width: 140, showOverflow: true }
              // ]

        }

</script>

<style lang="scss" scoped>

</style>
