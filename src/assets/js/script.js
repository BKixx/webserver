document.addEventListener('DOMContentLoaded', function() {
    // ==================== 页面切换功能 ====================
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // 切换页面显示
            pages.forEach(page => {
                if (page.id === targetPage) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
            
            // 滚动到顶部
            window.scrollTo(0, 0);
        });
    });
    
    // ==================== 宠物百科详情切换 ====================
    const petCards = document.querySelectorAll('.pet-card');
    const petDetails = document.querySelectorAll('.pet-detail');
    const backBtns = document.querySelectorAll('.back-btn');
    const petList = document.querySelector('.pet-list');
    
    // 初始隐藏所有详情页
    petDetails.forEach(detail => {
        detail.style.display = 'none';
    });
    
    // 为每个宠物卡片添加点击事件
    petCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 阻止默认链接行为
            if (e.target.tagName === 'A') {
                e.preventDefault();
            }
            
            // 获取当前卡片的宠物ID
            const petId = this.getAttribute('data-pet');
            
            // 隐藏宠物列表
            petList.style.display = 'none';
            
            // 显示对应的详情页
            const targetDetail = document.querySelector(`.pet-detail[data-pet="${petId}"]`);
            if (targetDetail) {
                targetDetail.style.display = 'block';
                
                // 更新URL哈希
                window.location.hash = `pet-${petId}`;
            }
        });
    });
    
    // 为所有返回按钮添加点击事件
    backBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 隐藏所有详情页
            petDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // 显示宠物列表
            petList.style.display = 'grid';
            
            // 清除URL哈希
            window.location.hash = '';
            
            // 滚动到顶部
            window.scrollTo(0, 0);
        });
    });
    
    // 处理页面加载时的hash
    if(window.location.hash && window.location.hash.startsWith('#pet-')) {
        const petId = window.location.hash.replace('#pet-', '');
        const targetDetail = document.querySelector(`.pet-detail[data-pet="${petId}"]`);
        if (targetDetail) {
            petList.style.display = 'none';
            targetDetail.style.display = 'block';
        }
    }
    
    // ==================== 其他切换功能 ====================
    // 分类切换
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            categories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
});