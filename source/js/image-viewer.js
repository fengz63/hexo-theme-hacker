// 图片查看器功能
class ImageViewer {
    constructor() {
        this.init();
    }

    init() {
        // 创建图片查看器DOM元素
        this.createViewer();
        // 绑定事件
        this.bindEvents();
    }

    createViewer() {
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.className = 'image-viewer-overlay';
        overlay.innerHTML = `
            <div class="image-viewer-container">
                <span class="image-viewer-close">&times;</span>
                <img class="image-viewer-img" src="" alt="">
                <div class="image-viewer-caption"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        this.overlay = overlay;
        this.container = overlay.querySelector('.image-viewer-container');
        this.img = overlay.querySelector('.image-viewer-img');
        this.closeBtn = overlay.querySelector('.image-viewer-close');
        this.caption = overlay.querySelector('.image-viewer-caption');
    }

    bindEvents() {
        // 绑定文章图片点击事件
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('.article-content img, .featured-media img');
            images.forEach(img => {
                img.addEventListener('click', (e) => {
                    this.openViewer(e.target);
                });
            });
        });

        // 绑定关闭事件
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay || e.target === this.closeBtn) {
                this.closeViewer();
            }
        });

        // 绑定键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeViewer();
            }
        });

        // 阻止图片查看器内的点击事件冒泡
        this.container.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    openViewer(imgElement) {
        const src = imgElement.src;
        const alt = imgElement.alt || '图片';
        
        // 设置图片和标题
        this.img.src = src;
        this.caption.textContent = alt;
        
        // 显示查看器
        this.overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 禁止背景滚动
        
        // 添加动画效果
        setTimeout(() => {
            this.overlay.style.opacity = '1';
            this.container.style.transform = 'scale(1)';
        }, 10);
    }

    closeViewer() {
        // 添加关闭动画
        this.overlay.style.opacity = '0';
        this.container.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            this.overlay.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
            this.img.src = '';
            this.caption.textContent = '';
        }, 300);
    }
}

// 初始化图片查看器
document.addEventListener('DOMContentLoaded', () => {
    new ImageViewer();
});