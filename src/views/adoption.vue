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
                        <li><a @click="router.push('/adoption')" class="active">宠物领养</a></li>
                        <li><a @click="router.push('/food')">宠物食物</a></li>
                        <li><a @click="router.push('/news')">宠物资讯</a></li>
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




        <!-- 宠物领养内容 -->
        <main>
            <section id="adoption" style="margin-top: 40px;">
                <div class="container">
                    <h2>宠物领养</h2>
                    <div class="adoption-intro">
                        <p>给这些可爱的动物一个温暖的家，领养代替购买。所有动物都经过健康检查，已接种疫苗。</p>
                    </div>
                    <div class="pets-for-adoption" id="point">
                        <div class="pet-card" v-for="item in showMenu" :key="item.id">
                            <div class="pet-badge" v-if="item.petLabel !== null">{{ item.petLabel }}</div>
                            <img :src="https + item.petImages" alt="可领养狗狗">
                            <div class="pet-info">
                                <h3>{{ item.petName }}</h3>
                                <div class="meta">
                                    <span><i class="fas fa-paw"></i> {{ item.petCategory }}</span>
                                    <span><i class="fas fa-birthday-cake"></i> {{ item.petAge }}</span>
                                    <span><i class="fas fa-venus-mars"></i> {{ item.petGender == 0 ? '雄性' : '雌性'
                                        }}</span>
                                </div>
                                <p>{{ item.petDescription }}</p>
                                <a href="#asd" class="btn btn-small">申请领养</a>
                            </div>
                        </div>
                    </div>
                    <div class="success-stories">
                        <h3>领养成功案例</h3>
                        <div class="story-slider">
                            <div class="story" v-for="item in showMenu1" :key="item.id">
                                <img :src="https + item.petImages" alt="领养成功案例">
                                <p>"{{ item.content.replace(/<[^>]+>/g, '') }}"</p>
                            </div>

                        </div>
                    </div>

                    <div class="adoption-form" id="asd">
                        <h3>领养申请表</h3>
                        <div>
                            <div class="form-group">
                                <label for="name">姓名</label>
                                <input v-model="forms.fullName" type="text" id="name" placeholder="请输入您的姓名">
                            </div>
                            <div class="form-group">
                                <label for="phone">联系电话</label>
                                <input v-model="forms.phone" type="tel" id="phone" placeholder="请输入您的联系电话">
                            </div>
                            <div class="form-group">
                                <label for="email">电子邮箱</label>
                                <input v-model="forms.email" type="email" id="email" placeholder="请输入您的电子邮箱">
                            </div>
                            <div class="form-group">
                                <label for="address">居住地址</label>
                                <input v-model="forms.address" type="text" id="address" placeholder="请输入您的详细地址">
                            </div>
                            <div class="form-group">
                                <label for="pet">想领养的宠物</label>
                                <input v-model="forms.desiredPet" type="text" id="pet" placeholder="请输入宠物名称">
                            </div>
                            <div class="form-group">
                                <label>是否有养宠经验</label>
                                <div class="radio-group">
                                    <label style="display: flex;"><input type="radio" v-model="forms.hasPetExperience"
                                            name="experience" value="0"> 有</label>
                                    <label style="display: flex;"><input type="radio" v-model="forms.hasPetExperience"
                                            name="experience" value="1"> 无</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="reason">领养理由</label>
                                <textarea v-model="forms.adoptionReason" id="reason"
                                    placeholder="请简要说明您的领养理由和家庭环境"></textarea>
                            </div>
                            <button type="" class="btn" @click="submitApplication">提交申请</button>
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
const showMenu = ref([])
const showMenu1 = ref([])
const forms = reactive({
    address: "",
    adoptionReason: "",
    desiredPet: "",
    email: "",
    fullName: "",
    hasPetExperience: 0,
    phone: ""
})
http.get('/system/user/profile').then(res => {
    showMenu2.value = res.data
})
http.get('/PetAdoption/PetAdoption/list?pageNum=1&pageSize=9999').then(res => {
    showMenu.value = res.rows
})
http.get('/PetLing/PetLing/list?pageNum=1&pageSize=9999').then(res => {
    showMenu1.value = res.rows
})
const submitApplication = () => {
    if (forms.address == '' || forms.adoptionReason == '' || forms.desiredPet == '' || forms.email == '' || forms.fullName == '' || forms.phone == '') {
        ElMessage.error("请填写完整信息")
        return
    }
    http.post('/application/application', forms).then(res => {

        if (res.code == 200) {
            ElMessage.success("提交成功！请等待审核员与您联系！")
        } else {
            ElMessage.error("提交失败！" + res.msg)
        }
    })
}

</script>
<style scoped>
ul:hover {
    cursor: pointer;
}
</style>