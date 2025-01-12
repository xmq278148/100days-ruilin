// 初始化轮播图
const swiper = new Swiper('.swiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    speed: 800,
});

// 监听滑动结束事件，隐藏已播放的照片
swiper.on('slideChange', function () {
    const slides = document.querySelectorAll('.swiper-slide');
    // 只隐藏上一张照片
    if (swiper.previousIndex >= 0) {
        slides[swiper.previousIndex].style.opacity = '0';
        slides[swiper.previousIndex].style.transition = 'opacity 0.5s';
    }
    // 当回到第一张时，重置所有照片的透明度
    if (swiper.activeIndex === 0) {
        slides.forEach(slide => {
            slide.style.opacity = '1';
        });
    }
});

// 在初始化时确保所有照片都是可见的
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        slide.style.opacity = '1';
    });
});

// 更新照片网格
const photoGrid = document.querySelector('.photo-grid');

// 照片数据
const photos = [
    { url: './百天照/198A1040.jpg', title: '熊睿霖百天照1' },
    { url: './百天照/198A1198.jpg', title: '熊睿霖百天照2' },
    { url: './百天照/198A1243.jpg', title: '熊睿霖百天照3' },
    { url: './百天照/CAAC0046.jpg', title: '熊睿霖百天照4' },
    { url: './百天照/CAAC9641.jpg', title: '熊睿霖百天照5' },
    { url: './百天照/CAAC9874.jpg', title: '熊睿霖百天照6' },
    { url: './百天照/CAAC9968.jpg', title: '熊睿霖百天照7' },
    { url: './百天照/CAAC9741.jpg', title: '熊睿霖百天照8' }
];

// 按原始顺序显示照片
photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = photo.title;
    img.onerror = () => {
        console.error(`图片加载失败: ${photo.url}`);
    };
    img.onload = () => {
        console.log(`图片加载成功: ${photo.url}`);
    };
    img.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
            img.style.transform = 'scale(1.15) translateZ(0)';
            img.style.boxShadow = '0 12px 30px rgba(102, 179, 255, 0.3)';
            img.style.zIndex = '1';
        });
    });
    img.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            img.style.transform = 'scale(1) translateZ(0)';
            img.style.boxShadow = 'none';
            img.style.zIndex = '0';
        });
    });
    photoGrid.appendChild(img);
});

// 背景音乐控制
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;  // 初始状态改为未播放

// 监听用户交互来开始播放音乐
function startMusic() {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            musicToggle.textContent = '⏸';
            musicToggle.classList.add('playing');
            isPlaying = true;
        }).catch(err => {
            console.log('音乐播放失败:', err);
        });
    }
}

// 监听各种用户交互
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });
document.addEventListener('scroll', startMusic, { once: true });
document.addEventListener('mousemove', startMusic, { once: true });

// 音乐控制按钮点击事件
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();  // 防止触发document的click事件
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵';
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.play();
        musicToggle.textContent = '⏸';
        musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
}); 
