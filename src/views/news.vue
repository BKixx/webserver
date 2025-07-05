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
                        <li><a @click="router.push('/news')" class="active">宠物资讯</a></li>
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




        <!-- 宠物资讯内容 -->
        <main style="margin-top: 40px;">
            <section id="news">
                <div class="container">
                    <h2>宠物资讯</h2>
                    <p class="intro-text">获取最新的宠物养护知识、行业新闻和活动信息</p>

                    <div class="news-tabs">
                        <div class="tab" @click="huan(item.id)" :class="item.id == vs ? 'active' : ''"
                            v-for="item in shows1" :key="item">{{
                                item.categoryName }}</div>
                    </div>

                    <div class="news-list">
                        <div class="news-card" v-for="item in shows2" :key="item.id">
                            <img :src="https + item.coverImage" alt="宠物旅行">
                            <div class="news-info">
                                <span class="category">{{ item.categoryId == 2 ? '养护知识' : item.categoryId ==
                                    3 ? '行业新闻' : item.categoryId == 4 ? '活动资讯' : '健康百科' }}</span>
                                <h3>{{ item.title }}</h3>
                                <div class="meta">
                                    <span><i class="fas fa-calendar-alt"></i> {{ item.createTime.slice(0, 10) }}</span>
                                    <span><i class="fas fa-eye"></i> {{ item.views }}</span>
                                </div>
                                <p class="excerpt">{{ item.content }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="newsletter">
                        <h3>订阅我们的资讯</h3>
                        <p>定期获取最新的宠物资讯、养护知识和特别优惠</p>
                        <form>
                            <input type="email" placeholder="请输入您的电子邮箱">
                            <button type="submit">订阅</button>
                        </form>
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
import { ref, reactive } from 'vue';
const showMenu2 = ref({});
import http from '@/request/request'
import router from '@/router';
const https = import.meta.env.VITE_APP_BASE_API_HTTP;
const shows1 = ref([])
const shows2 = ref([])
const vs = ref(0)
http.get('/system/user/profile').then(res => {
    showMenu2.value = res.data
})
http.get('/system/PetNewsCategory/list?pageNum=1&pageSize=9999').then(res => {
    shows1.value = res.rows
    console.log(res);
})
const xuan = async () => {
    await http.get('/system/PetNewsArticle/list?pageNum=1&pageSize=9999').then(res => {
        if (vs.value == 0) {
            shows2.value = res.rows
        } else {
            shows2.value = res.rows.filter(item => item.id == vs.value)

        }
    })
    shows2.value.forEach(item => {
        http.put(`/system/PetNewsArticle`, {
            id: item.id,
            views: item.views + 1
        }).then(res => {
            if (res.code == 200) {

            }
        })
    })
}
xuan()
const huan = (id) => {
    vs.value = id
    xuan()
}
</script>
<style scoped>
ul:hover {
    cursor: pointer;
}
</style>