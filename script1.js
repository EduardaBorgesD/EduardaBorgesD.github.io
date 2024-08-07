document.addEventListener("DOMContentLoaded", function () {
    const html = document.documentElement;
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const loader = document.getElementById('preloader');
    const frameCount = 3201;
    const currentFrame = (index) => `images/frames/${index.toString().padStart(5, "0")}.jpg`;
    
    const imageCache = {};
    let currentIndex = 1;
    const chunkSize = 200;

    canvas.width = 3660;
    canvas.height = 2100;

    const loadImage = (index) => {
        return new Promise((resolve, reject) => {
            if (imageCache[index]) {
                resolve(imageCache[index]);
            } else {
                const img = new Image();
                img.onload = () => {
                    imageCache[index] = img;
                    resolve(img);
                };
                img.onerror = reject;
                img.src = currentFrame(index);
            }
        });
    };

    const drawImage = (index) => {
        loadImage(index).then(img => {
            context.drawImage(img, 0, 0);
        });
    };

    const loadChunk = (start, end) => {
        for (let i = start; i <= end && i <= frameCount; i++) {
            loadImage(i);
        }
    };

    const scrollToTopButton = document.getElementById("scrollToTopButton");
    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = html.scrollTop;
                const maxScrollTop = html.scrollHeight - window.innerHeight;
                const scrollFraction = scrollTop / maxScrollTop;
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.ceil(scrollFraction * frameCount)
                );

                if (frameIndex !== currentIndex) {
                    currentIndex = frameIndex;
                    drawImage(currentIndex + 1);

                    const nextChunkStart = Math.floor(currentIndex / chunkSize) * chunkSize + 1;
                    loadChunk(nextChunkStart, nextChunkStart + chunkSize - 1);
                }

                scrollToTopButton.style.display = (frameIndex + 1 === frameCount) ? 'block' : 'none';

                ticking = false;
            });
            ticking = true;
        }
    });

    loadChunk(1, chunkSize);
    drawImage(1);

    loadImage(1).then(() => {
        loader.style.display = 'none';
    });
});