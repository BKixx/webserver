<template>
    <!-- 头部导航 -->
    <header class="header" style="">
        <div class="container">
            <div class="logo">
                <img src="@/assets/images/logo.png" alt="宠物联盟Logo">
                <h1>宠物联盟</h1>
            </div>
            <nav class="navbar" style="margin-right: 50px;">
                <ul>
                    <li><a @click="router.push('/')">首页</a></li>
                    <li><a @click="router.push('/encyclopedia')">宠物百科</a></li>
                    <li><a @click="router.push('/aid')">公益援助</a></li>
                    <li><a @click="router.push('/adoption')">宠物领养</a></li>
                    <li><a @click="router.push('/food')">宠物食物</a></li>
                    <li><a @click="router.push('/news')">宠物资讯</a></li>
                </ul>
            </nav>
            <div style="display: flex; align-items: center;">
                <img v-if="showMenu2.avatar !== null" :src="https + showMenu2.avatar"
                    style="width: 60px; height: 60px;border-radius: 50%;" alt="">
                <img v-else src="@/assets/images/logo.png" style="width: 60px; height: 60px;border-radius: 50%;" alt="">
                <div style="margin-left: 20px;">{{ showMenu2.nickName }}</div>
            </div>
        </div>
    </header>
    <div class="user-profile-container" style="margin-top: 140px;margin-bottom: 50px;">
        <!-- 头像上传区域 -->
        <div class="avatar-section">
            <el-upload class="avatar-uploader" :show-file-list="false" :before-upload="beforeAvatarUpload"
                :http-request="handleAvatarUpload">
                <img :src="datas.images == null || datas.images == '' ? datas.imgs : https + datas.images"
                    class="avatar-image" />
            </el-upload>

            <p class="upload-tip">点击上传新头像</p>
        </div>

        <!-- 基本信息表单 -->
        <el-form :model="form" label-width="100px" class="profile-form">
            <el-form-item label="昵称">
                <el-input v-model="datas.nickName" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="创建时间">
                <div>{{ datas.phone }}</div>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="datas.sex">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                    <el-radio label="2">保密</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit">保存修改</el-button>
                <el-button type="" @click="logout">退出登录</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 页脚 -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>关于我们</h3>
                    <p>宠物联盟成立于2015年，致力于为宠物和宠物主人提供全方位的服务，包括宠物领养、公益援助、宠物用品和资讯。</p>

                </div>
                <div class="footer-column">
                    <h3>快速链接</h3>
                    <ul>
                        <li><a @click="router.push('/')" class="active">首页</a></li>
                        <li><a @click="router.push('/encyclopedia')">宠物百科</a></li>
                        <li><a @click="router.push('/aid')">公益援助</a></li>
                        <li><a @click="router.push('/adoption')">宠物领养</a></li>
                        <li><a @click="router.push('/food')">宠物食物</a></li>
                        <li><a @click="router.push('/news')">宠物资讯</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>联系我们</h3>
                    <div class="contact-info">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>北京市朝阳区宠物大道123号</span>
                    </div>
                    <div class="contact-info">
                        <i class="fas fa-phone-alt"></i>
                        <span>400-888-8888</span>
                    </div>
                    <div class="contact-info">
                        <i class="fas fa-envelope"></i>
                        <span>contact@petsalliance.com</span>
                    </div>
                    <div class="contact-info">
                        <i class="fas fa-clock"></i>
                        <span>周一至周日 9:00-18:00</span>
                    </div>
                </div>
                <div class="footer-column">
                    <h3>微信公众号</h3>
                    <p>关注我们的微信公众号，获取最新资讯和优惠活动</p>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2023 宠物联盟 版权所有 | 京ICP备12345678号</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import http from '@/request/request'
import router from '@/router'
import defaultAvatar from '@/assets/logo.png'
let https = import.meta.env.VITE_APP_BASE_API_HTTP
const state = ref('')
//控制高亮
const dats = reactive({
    username: '',
    headerimg: '',
})
const datas = reactive({
    images: '',
    sex: '0',
    nickName: "",
    phone: '',
    users: {},
    imgs: defaultAvatar
})
const showMenu2 = ref({});
http.get('/system/user/profile').then(res => {
    showMenu2.value = res.data
})
const currentTime = ref('');
const greetingMessage = ref('');
const aboutDialogVisible = ref(false);
const contactDialogVisible = ref(false);
const sweetDialogVisible = ref(false);
const shows = ref(true)
if (!localStorage.getItem('token')) {
    shows.value = true
} else {
    shows.value = false
}
const logout = () => {
    localStorage.removeItem('token')
    ElMessage.success('退出成功')
    router.push('/login')
}

http.get('/system/user/profile').then(res => {
    dats.username = res.data.nickName
    dats.headerimg = https + res.data.avatar
    datas.sex = res.data.sex
    datas.users = res.data
    datas.images = res.data.avatar
    datas.nickName = res.data.nickName
    datas.phone = res.data.createTime
})
// 头像上传处理
const handleAvatarUpload = async (options) => {
    const formData = new FormData()
    formData.append('avatarfile', options.file)

    try {
        const res = await http.post('/system/user/profile/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })


        if (res.code === 200) {
            datas.images = res.imgUrl
            ElMessage.success('上传成功！')
        } else {
            ElMessage.error(res.msg || '上传失败')
        }
    } catch (error) {
        ElMessage.error('上传失败: ' + (error.response?.data?.message || error.message))
    }
}

// 提交表单
const submit = () => {
    http.put('/system/user/profile', {
        'nickName': datas.nickName,
        'sex': datas.sex,
        'avatar': datas.images
    }).then(res => {
        if (res.code == 200) {
            ElMessage.success('修改成功！')
            setTimeout(() => {
                router.push('/')

            }, 300);
        } else {
            ElMessage.error(res.msg);
        }
    })
}
// // 获取当前时间段
const getTimePeriod = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 6 && hours < 12) {
        return '上午';
    } else if (hours >= 12 && hours < 18) {
        return '中午';
    } else {
        return '晚上';
    }
};

// // 更新时间函数
const updateTime = () => {
    const now = new Date();
    const period = getTimePeriod();

    // 格式化时间显示
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    currentTime.value = `${hours}:${minutes}:${seconds}`;
    greetingMessage.value = `${period}好`;
};

// 设置定时器
let timer;
onMounted(() => {
    updateTime(); // 立即执行一次
    timer = setInterval(updateTime, 1000); // 每秒更新一次
});

// 清除定时器
onUnmounted(() => {
    clearInterval(timer);
});
</script>

<style scoped>
.top-nav {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background: #FF0036;
    color: white;
}

.logo-area {
    transition: all .4s;
    cursor: pointer;
}

.logo-area:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
}


.el-button--primary[data-v-b4e148ca] {
    height: 30px;
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo-img {
    width: 40px;
    height: 40px;
}

.logo-text {
    font-size: 20px;
    font-weight: bold;
    color: #d81e06;
    /* 加深红色 */
}

.search-area {
    display: flex;
    align-items: center;
    width: 500px;
}

.search-input {
    width: 100%;
    margin-right: 10px;
}

ul:hover {
    cursor: pointer;
}

#bao {
    color: #888;
    transition: all 0.3s;
    cursor: pointer;
}

#bao:hover {
    color: #409EFF;
}

.nav-buttons {
    display: flex;
    align-items: center;
    gap: 15px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #606266;
    font-size: 14px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    margin-right: 30px;
}

.search-input {
    width: 500px;
}

.search-input :deep(.el-input-group__append) {
    background: #FF0036;
    border-color: #FF0036;
    color: white;
}

.nav-links {
    margin-left: auto;
    display: flex;
    gap: 20px;
}

.user-profile-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.avatar-section {
    text-align: center;
    margin-bottom: 30px;
}

.avatar-uploader {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border: 1px dashed var(--el-border-color);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
    border-color: var(--el-color-primary);
}

.avatar-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
    color: #8c939d;
}

.upload-tip {
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-top: 10px;
}

.profile-form {
    padding: 0 20px;
}

.el-form-item:last-child {
    margin-bottom: 0;
}
</style>