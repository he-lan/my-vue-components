import Vue from 'vue';
import XEUtils from 'xe-utils'

import {
    Grid,
    VXETable,
  Icon,
  Header,
  Column,
  Table,
  Pager,
  Select,
} from 'vxe-table'

import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

VXETable.setup({
  i18n: (key) => XEUtils.get(zhCN, key)
})



  Vue.use(Grid)
  Vue.use(Icon)
  Vue.use(Header)
  Vue.use(Column)
  Vue.use(Pager)
  Vue.use(Select)
  // 最后安装核心库
  Vue.use(Table)