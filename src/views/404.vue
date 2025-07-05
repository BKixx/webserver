<template>
    <div class="not-found">
        <!-- 动态粒子背景 -->
        <div ref="particles" class="particles"></div>

        <!-- 内容区域 -->
        <div class="content">
            <h1 class="error-code" style="color: #fff;">404</h1>
            <p class="error-message">页面不存在或已消失</p>
            <button @click="router.push('/')" class="home-button">
                <i class="fas fa-home"></i> 返回首页
            </button>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';


</script>

<style scoped>
.not-found {
    position: relative;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.particles {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: white;
}

.error-code {
    font-size: 120px;
    font-weight: bold;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    animation: pulse 2s infinite;
}

.error-message {
    font-size: 24px;
    margin-bottom: 30px;
    opacity: 0.9;
}

.home-button {
    padding: 12px 30px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
}

.home-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.home-button i {
    margin-right: 8px;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}
</style>