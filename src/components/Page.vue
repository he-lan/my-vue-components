<template>
  <div>
    <!-- <vxe-toolbar  custom>
      <template v-slot:buttons>
        <vxe-button > 测试</vxe-button>
        <vxe-button >保存</vxe-button>
      </template>
    </vxe-toolbar> -->
    <vxe-grid
      align="center"
      id="toolbar_demo_2"
      size="small"
      border
      resizable
      auto-resize
      highlight-hover-row
      max-height="680"
      show-overflow
      :data="tableData"
      :loading="loading && spinning"
      :toolbar-config="tableToolbar"
      :seq-config="{
        startIndex: (pagerConfig.currentPage - 1) * pagerConfig.pageSize,
      }"
      :pager-config="pagerConfig"
      :sort-config="{
        remote: true,
        defaultSort: {
          field: defaultSort.field,
          order: defaultSort.order,
        },
      }"
      :custom-config="tableCustom"
      :filter-config="{
        remote: true,
      }"
      v-bind="tableProps"
      @sort-change="handleSortChange"
      @page-change="handlePageChange"
      @checkbox-all="selectAllEvent"
      @checkbox-change="selectChangeEvent"
    >
    <template v-slot:toolbar_buttons>
      <vxe-button status="primary">搜索</vxe-button>
      <vxe-button >刷新</vxe-button>
      <vxe-button>新增</vxe-button>
      
    </template>
      <vxe-table-column v-for="(column, index) in columns" :key="index" v-bind="column">
        <template v-slot:header>
          <span>{{ column.title }}</span>
          <ItemFilter
            v-if="column.filterType === 'item'"
            :filterList="getFilterValue(column.field)"
            :column="column"
            :fetch="fetchColumn"
            @change="handleFilter"
          />
        </template>
        <template v-if="column.slotName" v-slot="{ row }">
          <slot :name="column.slotName" :row="row"></slot>
        </template>
      </vxe-table-column>
    </vxe-grid>
  </div>

  </template>

<script>
    const defaultPage = { data: [], page: 1, size: 10, total: 0 };
    const toLine = (name) => {
        return name.replace(/([A-Z])/g, '_$1').toLowerCase();
    };
    import { cloneDeep } from 'lodash';

    import ItemFilter from './ItemFilter.vue';
    export default {
        components:{
            ItemFilter
        },
        props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    fetch: {
      type: Object,
      default() {
        return {
          data: () => Promise.resolve(defaultPage),
          column: () => Promise.resolve([]),
        };
      },
    },
    defaultSort: {
      type: Object,
      default() {
        return {
          field: '',
          order: '',
        };
      },
    },
    defaultSearch: {
      type: Object,
      default() {
        return {
          keys: [],
          values: [],
        };
      },
    },
    fieldType: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: true,
    },
    tableProps: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      tableCustom: {
                storage: true
              },
      tableToolbar: {
                custom: true,
                slots: {
                  buttons: 'toolbar_buttons'
                }
              },
 
      spinning: true,
      tableData: [],
      pagerConfig: {
        total: defaultPage.total,
        currentPage: defaultPage.page,
        pageSize: defaultPage.size,
        align: 'center',
        pageSizes: [defaultPage.size, 30, 45, 60, 75, 100, 200],
        layouts: [
          'Total',
          'PrevJump',
          'PrevPage',
          'Number',
          'NextPage',
          'NextJump',
          'FullJump',
          'Sizes',
        ],
        size: 'small',
      },
      checked: [],
      search: this.defaultSearch,
      sort: this.defaultSort,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(params) {
      this.spinning = true;
      const { currentPage: page, pageSize: limit } = this.pagerConfig;
      const {
        search: { keys, values },
        sort: { field, order },
      } = this;
      const newParams = {
        page,
        limit,
        searchKey: keys,
        searchValue: values,
        ascOrDesc: order,
        orderBy: field,
        ...params,
      };
      newParams.orderBy = this.transformField(newParams.orderBy);
      newParams.searchKey = newParams.searchKey.map((key) => this.transformField(key));
      return this.fetch
        .data(newParams)
        .then(({ list, total }) => {
          this.tableData = list;
          this.pagerConfig.total = total;
          this.checked = [];
        })
        .finally(() => {
          this.spinning = false;
        });
    },
    fetchColumn(key) {
      const {
        sort: { field, order },
      } = this;
      const searchKey = cloneDeep(this.search.keys);
      const searchValue =cloneDeep( this.search.values);
      // 合并
      const index = searchKey.findIndex((item) => item === key);
      if (index !== -1) {
        searchKey.splice(index, 1);
        searchValue.splice(index, 1);
      }

      // 约定放在第一位
      searchKey.unshift(key);
      searchValue.unshift([]);

      const newParams = { ascOrDesc: order, orderBy: field, searchKey, searchValue };
      newParams.orderBy = this.transformField(newParams.orderBy);
      newParams.searchKey = newParams.searchKey.map((key) => this.transformField(key));
      return this.fetch.column(newParams);
    },
    handleSortChange({ property, order }) {
      this.sort = { field: order ? property : '', order };
      this.fetchData();
    },
    handlePageChange({ currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage;
      this.pagerConfig.pageSize = pageSize;
      this.fetchData();
    },
    handleFilter(key, value) {
      let index = this.search.keys.findIndex((item) => item === key);
      if (index === -1) {
        index = this.search.keys.push(key) - 1;
      }
      this.search.values[index] = value;
      this.pagerConfig.currentPage = 1;
      this.fetchData();
    },
    getFilterValue(key) {
      const index = this.search.keys.findIndex((item) => item === key);
      if (index === -1) {
        return [];
      }
      return this.search.values[index];
    },
    selectAllEvent({ records }) {
      this.checked = records;
    },
    selectChangeEvent({ records }) {
      this.checked = records;
    },
    transformField(value) {
      switch (this.fieldType) {
        case 'line': {
          return toLine(value);
        }
        default:
          return value;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>