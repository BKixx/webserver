import "./assets/main.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css"; // 暗黑模式支持
import "@/assets/css/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn"; // 中文语言包
import App from "./App.vue";
import router from "./router";
    

const app = createApp(App);
const pinia = createPinia();

// 注册Element Plus组件
app.use(ElementPlus, {
  locale: zhCn,
  size: "default", // 全局尺寸
  zIndex: 3000, // 全局z-index
});

// 注册Pinia
app.use(pinia);

// 注册路由
app.use(router);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 自定义指令：点击元素外部触发事件
app.directive("click-outside", {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

app.mount("#app");
