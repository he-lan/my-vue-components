import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins'
import dayjs from 'dayjs'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)

import XEAjax from 'xe-ajax'
import VXEAjax from 'xe-ajax'



Vue.prototype.$dayjs=dayjs;
Vue.config.productionTip = false;
Vue.use(VXEAjax, XEAjax);

Vue.prototype.$ajax = XEAjax

//  let store=new Vuex.Store({
//   state:{
//     count:0,
//     arr:[1,3,4,7,9,4,6]
//   },
//   mutations:{
//     increment(state){
//       state.count++;
//     }
//   },
//   getters:{
//       filterArr(state){
//         return state.arr.filter(item=>item>5)
//       },
//       getLength(state,getters){
//         return getters.filterData.length;
//       },
//       filterData(state){
//         return (num)=>{
//           return state.arr.filter(item=>item>num)
//         }
//       }
//   }
// })
// store.commit('increment')
// store.commit('increment')
// console.log(store.getters.filterArr)
// console.log(store.getters.getLength,'length')
// console.log(store.getters.filterData(3),'filterData')
// console.log(store.state.count)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
