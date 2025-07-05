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
        <main style="margin-top: 40px;">
            <section id="encyclopedia">
                <div class="container">
                    <h2>宠物百科</h2>
                    <p class="intro-text">了解不同宠物的品种特点、饲养方法和健康知识</p>

                    <div class="search-bar">
                        <input v-model="shows" type="text" placeholder="搜索宠物品种...">
                        <button @click="xuan"><i class="fas fa-search"></i> 搜索</button>
                    </div>
                    <div class="pet-list" v-if="showMenus.length > 0">
                        <div class="pet-card" :data-pet="`golden-retriever` + index" v-for="(item, index) in showMenus"
                            :key="item">
                            <img :src="https + item.imageUrl" :alt="item.breedName">
                            <div class="pet-card-content">
                                <h3>{{ item.breedName }}</h3>
                                <p>{{ item.description }}</p>
                                <a @click="toEncxq(item.id)" href="#" class="btn btn-small">了解更多</a>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <el-empty description="没有该品种动物/请搜索该品种学名例如（英国短毛猫）" />
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
const showMenus = ref([]);
const shows = ref('');
http.get('/system/user/profile').then(res => {
    showMenu2.value = res.data
})
const toEncxq = (index) => {
    localStorage.setItem('encxq', index)
    router.push('/encxq')
}
const xuan = () => {
    http.get(`/DogBreeds/DogBreeds/list?pageNum=1&pageSize=9999&breedName=${shows.value}`).then(res => {
        showMenus.value = res.rows
    })
}
xuan()
</script>
<style scoped>
ul:hover {
    cursor: pointer;
}
</style>