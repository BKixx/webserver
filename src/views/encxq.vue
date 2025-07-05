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
                        <li><a @click="router.push('/encyclopedia')" class="active">宠物百科</a></li>
                        <li><a @click="router.push('/aid')">公益援助</a></li>
                        <li><a @click="router.push('/adoption')">宠物领养</a></li>
                        <li><a @click="router.push('/food')">宠物食物</a></li>
                        <li><a @click="router.push('/news')">宠物资讯</a></li>
                        <li><a @click="router.push('/gou')"></a></li>

                    </ul>
                </nav>
                <div @click="router.push('/userinfo')" style="display: flex; align-items: center;">
                    <img v-if="showMenu2.avatar !== null" :src="https + showMenu2.avatar"
                        style="width: 60px; height: 60px;border-radius: 50%;" alt="">
                    <img v-else src="@/assets/images/logo.png" style="width: 60px; height: 60px;border-radius: 50%;"
                        alt="">
                    <div style="margin-left: 20px;">{{ showMenu2.nickName }}</div>
                </div>
            </div>
        </header>



        <!-- 宠物百科内容 -->
        <main>
            <section id="encyclopedia">
                <div class="container" style="margin-top: 40px;">
                    <div data-pet="golden-retriever">
                        <button class="back-btn" @click="router.push('/encyclopedia')"><i class="fas fa-arrow-left"></i>
                            返回列表</button>
                        <div class="detail-content">
                            <img :src="https + showMenus.imageUrl" :alt="showMenus.breedName">
                            <div class="detail-info">
                                <h3>{{ showMenus.breedName }}</h3>
                                <div class="info-row">
                                    <span>别名</span>
                                    <p>{{ showMenus.alias }}</p>
                                </div>
                                <div class="info-row">
                                    <span>原产地</span>
                                    <p>{{ showMenus.origin }}</p>
                                </div>
                                <div class="info-row">
                                    <span>体型</span>
                                    <p>{{ showMenus.size }}</p>
                                </div>
                                <div class="info-row">
                                    <span>寿命</span>
                                    <p>{{ showMenus.lifespan }}</p>
                                </div>
                                <div class="info-row">
                                    <span>性格特点</span>
                                    <p>{{ showMenus.temperament }}</p>
                                </div>
                                <div class="info-row">
                                    <span>饲养难度</span>
                                    <p>{{ showMenus.careDifficulty }}</p>
                                </div>
                                <div class="info-row">
                                    <span>适合人群</span>
                                    <p>{{ showMenus.suitableFor }}</p>
                                </div>
                                <div class="info-row">
                                    <span>运动需求</span>
                                    <p>{{ showMenus.exerciseNeeds }}</p>
                                </div>
                                <div class="info-row">
                                    <span>护理需求</span>
                                    <p>{{ showMenus.groomingNeeds }}</p>
                                </div>
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
                            <li><a @click="router.push('/')">首页</a></li>
                            <li><a @click="router.push('/encyclopedia')">宠物百科</a></li>
                            <li><a @click="router.push('/aid')">公益援助</a></li>
                            <li><a @click="router.push('/adoption')">宠物领养</a></li>
                            <li><a @click="router.push('/food')">宠物食物</a></li>
                            <li><a @click="router.push('/news')">宠物资讯</a></li>
                            <li><a @click="router.push('/gou')"></a></li>

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
import { ref, reactive } from 'vue';
const showMenu2 = ref({});
import http from '@/request/request'
import router from '@/router';
const https = import.meta.env.VITE_APP_BASE_API_HTTP;
const showMenus = ref({});

const shows = ref(false);
http.get('/system/user/profile').then(res => {
    showMenu2.value = res.data
})
const xuan = () => {
    http.get(`/DogBreeds/DogBreeds/list?pageNum=1&pageSize=9999`).then(res => {
        showMenus.value = res.rows.filter(item => item.id == localStorage.getItem('encxq'))[0]
        shows.value = true
    })
}
xuan()
</script>
<style scoped>
ul:hover {
    cursor: pointer;
}
</style>