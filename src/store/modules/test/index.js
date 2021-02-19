import types from './types'
const test={
    namespaced:true,
    state:{
        testMessage:'testMessage',
        count:1,
    },
    getters:{
        updateCount(state){
            return (val)=>{
                return state.count+=val;
            }
        }
    },
    mutations:{
        [types.SET_TESTMESSAGE](state,val){
            state.testMessage=val;
        }
    },
    actions:{
         changeMessage({commit}){
            commit(types.SET_TESTMESSAGE,'new-test-message');
            // console.log(store.getters.updateCount);

        },
        // 带命名空间的模块注册全局action
        // changeMessage:{
        //     root:true,
        //     handler({dispatch,commit,getters,rootGetters},args){
        //         'someAction'
        //     }
        // }
    }
}
export default test;