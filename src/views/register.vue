<template>
    <div>
        <!-- 头部导航 -->
        <header class="header">
            <div class="container">
                <div class="logo">
                    <img src="@/assets/images/logo.png" alt="宠物联盟Logo">
                    <h1>宠物联盟</h1>
                </div>
                <nav class="navbar">
                    <ul>
                        <li><a @click="router.push('/')">首页</a></li>
                        <li><a @click="router.push('/encyclopedia')">宠物百科</a></li>
                        <li><a @click="router.push('/aid')">公益援助</a></li>
                        <li><a @click="router.push('/adoption')">宠物领养</a></li>
                        <li><a @click="router.push('/food')">宠物食物</a></li>
                        <li><a @click="router.push('/news')">宠物资讯</a></li>
                    </ul>
                </nav>
               
            </div>
        </header>

        <!-- 登录/注册内容 -->
        <main>
            <section id="login">
                <div class="auth-container">
                    <div class="auth-tabs">
                        <div class="auth-tab " @click="router.push('/login')">登录</div>
                        <div class="auth-tab active">注册</div>
                    </div>
                    <div class="auth-content active">
                        <div class="auth-form" style="display: block;">
                            <div class="form-group">
                                <label for="register-name">账号</label>
                                <input v-model="username" type="text" id="register-name" placeholder="请输入您的账号">
                            </div>
                            <div class="form-group">
                                <label for="register-password">密码</label>
                                <input v-model="password" type="password" id="register-password"
                                    placeholder="请输入密码（至少6位）">
                            </div>
                            <div class="form-group">
                                <label for="register-confirm">确认密码</label>
                                <input v-model="password2" type="password" id="register-confirm" placeholder="请再次输入密码">
                            </div>
                            <button type="" class="btn" @click="register">注册</button>
                            <div class="social-login">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

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
    </div>
</template>
<script setup>
import router from '@/router';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import http from '@/request/request'
const username = ref('');
const password = ref('');
const password2 = ref('');
const register = () => {
    if (username.value === '' || password.value === '') {
        ElMessage.error('请填写完整信息');
        return;
    }
    if (password.value.length < 6) {
        ElMessage.error('密码长度不能小于6位');
        return;
    }
    if (password.value !== password2.value) {
        ElMessage.error('两次密码不一致');
        return;
    }

    http.post('/register', {
        'username': username.value,
        'password': password.value
    }).then(res => {
        if (res.code == 200) {
            ElMessage.success('注册成功')
            router.push('/login')
        } else {
            ElMessage.error(res.msg);
        }
    })

}
</script>
<style scoped>
ul:hover {
    cursor: pointer;
}
</style>