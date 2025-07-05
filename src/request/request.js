import axios from "axios";

const serviceAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_HTTP, // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("token"),
  },
});

// 创建请求拦截
serviceAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("请求拦截器错误:", error);
    return Promise.reject(error);
  }
);

// 创建响应拦截
serviceAxios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    let message = "网络错误，请检查您的网络连接或稍后再试！";
    if (error && error.response) {
      message = `HTTP ${error.response.status}: ${error.response.statusText}`;
    }
    console.error("响应拦截器错误:", message);
    return Promise.reject(message);
  }
);

export default serviceAxios;
