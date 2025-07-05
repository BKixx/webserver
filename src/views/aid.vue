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
                        <li><a @click="router.push('/aid')" class="active">公益援助</a></li>
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




        <!-- 公益援助内容 -->
        <main>
            <section id="aid" style="margin-top: 40px;">
                <div class="container">
                    <h2>公益援助</h2>
                    <div class="aid-intro">
                        <p>加入我们的公益活动，为流浪动物提供食物、医疗和温暖的家。您的每一份帮助都能改变它们的命运。</p>
                        <a href="#events" class="btn">立即参与</a>
                    </div>

                    <div class="events" id="events">
                        <h3>近期活动</h3>
                        <div class="event-card" v-for="item in shows" :key="item.id">
                            <img :src="https + item.coverImage" :alt="item.eventName">
                            <div class="event-info">
                                <h4>{{ item.eventName }}</h4>
                                <div class="meta">
                                    <span><i class="fas fa-calendar-alt"></i> {{ item.createdAt }}</span>
                                    <span><i class="fas fa-map-marker-alt"></i> {{ item.location }}</span>
                                    <span><i class="fas fa-users"></i> 已报名 {{ item.registeredCount }}人</span>
                                </div>
                                <p>{{ item.description }}</p>
                                <div class="event-actions">
                                    <span>剩余名额: {{ item.remainingSlots }}人</span>
                                    <a href="javascript:;" class="btn btn-small"
                                        @click="bao(item.id, item.registeredCount, item.remainingSlots)">立即报名</a>
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
import { ElMessage } from 'element-plus';
const https = import.meta.env.VITE_APP_BASE_API_HTTP;
const shows = ref([])
http.get('/system/user/profile').then(res => {
    showMenu2.value = res.data
})
const xuan = () => {
    http.get('/AnimalRescueEvents/AnimalRescueEvents/list?pageNum=1&pageSize=9999').then(res => {
        shows.value = res.rows
        console.log(res.rows);

    })
}
xuan()

const bao = (id, registeredCount, remainingSlots) => {
    console.log(id, registeredCount, remainingSlots);
    if (remainingSlots == 0) {
        return ElMessage.error('该活动已满员，无法报名')
    }
    http.put(`/AnimalRescueEvents/AnimalRescueEvents`, {
        id: id,
        registeredCount: registeredCount + 1,
        remainingSlots: remainingSlots - 1
    }).then(res => {
        if (res.code == 200) {
            ElMessage.success('报名成功')
            xuan()
        }
        else {
            ElMessage.error(res.msg)
        }
    })
}
</script>
<style scoped>
ul:hover {
    cursor: pointer;
}
</style>