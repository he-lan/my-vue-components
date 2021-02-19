import Vue from "vue";
import Vuex from "vuex";
import test from './modules/test'

Vue.use(Vuex);

 const store=new Vuex.Store({
  state: {
    count:3,
    arr:[1,3,4,7,9,4,6]
  },
  mutations: {
    increment(state,n){
      state.count+=n;
    },
    // [types.SET_INCREMENT](state,n){
    //   state.count+=n
    // }
  },
  getters:{
    filterArr(state){
      return state.arr.filter(item=>item>5)
    },
    getLength(state,getters){
      return getters.filterData.length;
    },
    filterData(state){
      return (num)=>{
        return state.arr.filter(item=>item>num)
      }
    }
  },
  actions: {},
  modules: {
    test
  }
});

if(module.hot){
    module.hot.accept([
      './modules/test'
    ],
    ()=>{
      //加载新模块
      store.hotUpdate({
        modules:{
          test:require('./modules/test').default,//因为babel6的模块编译格式问题，这里需要加上'.default'
        }
      })
    }
    )
}

export default store;
