import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
    import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    children:[
      {
        path:'/',
        redirect:'dayjs'
      },
      {
        path:'dayjs',
        name:'DayJs',
        component:() =>import(/* webpackChunkName: "DayJs" */ "../components/DayJs.vue"),
      },{
        path:'selectall/one',
        name:'SelectAll',
        component:() =>import(/* webpackChunkName: "SelectAll" */ "../components/SelectAll.vue"),
      },{
        path:'selectall/two',
        name:'SelectAll1',
        component:() =>import(/* webpackChunkName: "SelectAll1" */ "../components/SelectAll1.vue"),
      },
        {
          path:'/table/hasPage',
          name:'TableHasPage',
          component:() =>import(/* webpackChunkName: "SelectAll1" */ "../components/TableHasPage.vue"),
        },
        {
          path:'/table/hasNoPage',
          name:'TableHasNoPage',
          component:() =>import(/* webpackChunkName: "SelectAll1" */ "../components/TableHasNoPage.vue"),
        },
        {
          path:'/dynamicTable',
          name:'DynamicTable',
          component:()=>import("../components/DynamicTable")
        }
   
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
