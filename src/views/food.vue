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
                        <li><a @click="router.push('/food')" class="active">宠物食物</a></li>
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



        <!-- 宠物食物内容 -->
        <main>
            <section id="food" style="margin-top: 40px;">
                <div class="container">
                    <h2>宠物食物</h2>
                    <div class="food-intro">
                        <p>为您的爱宠选择最适合的营养食品，我们提供各种优质宠物食品和营养补充剂。</p>
                    </div>

                    <div class="food-list">
                        <div class="food-card" v-for="item in show" :key="item.id">
                            <img :src="https + item.productImage" :alt="item.productName">
                            <div class="food-info">
                                <h3>{{ item.productName }}</h3>
                                <div class="rating">
                                    <el-rate v-model="item.rating" disabled text-color="#ff9900" />
                                    <span>({{ item.stock }})</span>
                                </div>
                                <p>{{ item.description }}</p>
                                <div class="price">¥{{ item.currentPrice }} <span class="original"
                                        v-if="item.originalPrice !== 0">￥${{ item.originalPrice }}</span></div>
                                <a href="javascript:;" @click="addToCart(item.id, item.stock)"
                                    class="btn btn-small">加入购物车</a>
                            </div>
                        </div>
                    </div>

                    <div class="feeding-guide">
                        <h3>喂养指南</h3>
                        <div class="guide-cards">
                            <div class="guide-card" v-for="item in jian" :key="item.id">
                                <h4><i class="fas"></i> {{ item.title }}</h4>
                                <ul>
                                    <li v-for="datas in JSON.parse(item.contentList)" :key="datas">
                                        {{ datas }}
                                    </li>
                                </ul>
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
const jian = ref([]);
const show = ref([])
http.get('/system/user/profile').then(res => {
    showMenu2.value = res.data
})
http.get('/FeedingGuides/guides/list?pageNum=1&pageSize=9999').then(res => {
    jian.value = res.rows
})
const xuan = async () => {
    await http.get('/system/products/list?pageNum=1&pageSize=9999').then(res => {
        show.value = res.rows
    })
}
xuan()
const addToCart = (id, stock) => {
    if (stock > 0) {
        http.put('/system/products', {
            id: id,
            stock: stock - 1
        }).then(res => {
            console.log(res);
            if (res.code == 200) {
            } else {
                return ElMessage.error(res.msg)
            }
        })
        http.post('/system/shops', {
            shop: id,
            userid: showMenu2.value.userId
        }).then(res => {
            if (res.code == 200) {
            } else {
                return ElMessage.error(res.msg)
            }
        })
        ElMessage.success('以添加到您的购物车中！请到线下店内交付拿货！')
        xuan()
    } else {
        ElMessage.error('该商品已售罄')
    }
}
</script>
<style scoped>
ul:hover {
    cursor: pointer;
}
</style>