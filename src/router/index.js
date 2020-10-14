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
