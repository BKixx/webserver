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
            <li><a @click="router.push('/')" class="active">首页</a></li>
            <li><a @click="router.push('/encyclopedia')">宠物百科</a></li>
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
          <img v-else src="@/assets/images/logo.png" style="width: 60px; height: 60px;border-radius: 50%;" alt="">
          <div style="margin-left: 20px;">{{ showMenu2.nickName }}</div>
        </div>
      </div>
    </header>

    <!-- 首页内容 -->
    <main>
      <section id="home">
        <div class="container">
          <div class="hero">
            <h2>关爱每一只小生命</h2>
            <p>宠物联盟致力于为宠物提供最好的关爱，为宠物主人提供最全面的服务，让我们一起为宠物创造一个更美好的世界</p>
            <div class="cta-buttons">
              <a @click="router.push('/adoption')" class="btn">领养宠物</a>
              <a @click="router.push('/aid')" class="btn btn-outline">参与公益</a>
            </div>
          </div>

          <div class="features">
            <div class="feature-card">
              <i class="fas fa-paw"></i>
              <h3>宠物百科</h3>
              <p>全面的宠物品种信息库，了解不同宠物的习性、饲养方法和健康知识</p>
              <a @click="router.push('/encyclopedia')" class="btn btn-small">了解更多</a>
            </div>
            <div class="feature-card">
              <i class="fas fa-heart"></i>
              <h3>公益援助</h3>
              <p>参与我们的公益活动，帮助流浪动物，为它们提供食物、医疗和温暖的家</p>
              <a @click="router.push('/aid')" class="btn btn-small">参与活动</a>
            </div>
            <div class="feature-card">
              <i class="fas fa-home"></i>
              <h3>宠物领养</h3>
              <p>寻找您的新家庭成员，给流浪动物一个充满爱的家</p>
              <a @click="router.push('/adoption')" class="btn btn-small">查看宠物</a>
            </div>
          </div>

          <div class="testimonials">
            <h2>成功故事</h2>
            <div class="testimonial-slider">
              <div class="testimonial" v-for="item in showMenu" :key="item.id">
                <img :src="https + item.avatarImage" :alt="item.authorName">
                <p>"{{ item.quoteText }}"</p>
                <span>- {{ item.authorName }}</span>
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
import router from '@/router';
import { ref, reactive } from 'vue';
import http from '@/request/request'
const https = import.meta.env.VITE_APP_BASE_API_HTTP;
const showMenu = ref([]);
const showMenu2 = ref({});
http.get('/system/SuccessStories/list?pageNum=1&pageSize=99999').then(res => {
  showMenu.value = res.rows
})
http.get('/system/user/profile').then(res => {
  showMenu2.value = res.data
  if (showMenu2.value == undefined) {
    location.reload()
  }

})

</script>
<style scoped>
ul:hover {
  cursor: pointer;
}
</style>