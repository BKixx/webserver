import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/404.vue"; // 添加404页面
import userinfo from "../views/userinfo.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";
import encyclopedia from "../views/encyclopedia.vue";
import encxq from "../views/encxq.vue";
import aid from "../views/aid.vue";
import adoption from "../views/adoption.vue";
import food from "../views/food.vue";
import news from "../views/news.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true, // 需要登录
        title: "首页",
      },
    },
    {
      path: "/userinfo",
      name: "userinfo",
      component: userinfo,
      meta: { title: "修改个人信息" },
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: { title: "登录" },
    },
    {
      path: "/register",
      name: "register",
      component: register,
      meta: { title: "注册" },
    },
    {
      path: "/encyclopedia",
      name: "encyclopedia",
      component: encyclopedia,
      meta: { title: "宠物百科" },
    },
    {
      path: "/adoption",
      name: "adoption",
      component: adoption,
      meta: { title: "宠物领养" },
    },
    {
      path: "/aid",
      name: "aid",
      component: aid,
      meta: { title: "公益援助" },
    },
    {
      path: "/food",
      name: "food",
      component: food,
      meta: { title: "宠物食物" },
    },
    {
      path: "/news",
      name: "news",
      component: news,
      meta: { title: "宠物咨询" },
    },
    {
      path: "/encxq",
      name: "encxq",
      component: encxq,
      meta: { title: "宠物百科" },
    },
    {
      path: "/:pathMatch(.*)*", // 404路由
      name: "not-found",
      component: NotFound,
      meta: { title: "页面不存在" },
    },
  ],
});
// 在router.js的导出前添加导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAuthRequired = to.matched.some((record) => record.meta.requiresAuth);
  const isGuestOnly = to.matched.some((record) => record.meta.guestOnly);

  // 设置标题
  if (to.meta.title) document.title = `${to.meta.title} - 宠物联盟`;

  // 情况1：未登录访问需认证路由
  if (isAuthRequired && !token) {
    console.log("Redirecting to login");
    return next({ name: "login", query: { redirect: to.fullPath } });
  }

  // 情况2：已登录访问guestOnly路由
  if (isGuestOnly && token) {
    return next({ name: "home" });
  }

  // 放行
  next();
});
export default router;
