document.addEventListener('DOMContentLoaded', () => {
    const lottiePlayers = document.querySelectorAll('.lottie1, .lottie2, .lottie3, .lottie4, .lottie5, .lottie6, .lottie7, .lottie8, .lottie9, .lottie10, .lottie11, .lottie12, .lottie13, .lottie14, .lottie15, .lottie16, .lottie17, .lottie18, .lottie19, .lottie20, .lottie21, .lottie22, .lottie23, .lottie24, .lottie25, .lottie26, .lottie27, .lottie28, .lottie29, .lottie30');
    const loader = document.getElementById('preloader');
    const textDisplay = document.getElementById('text-display');
    const texto2 = document.getElementById('texto2');

    const staticElements = document.querySelectorAll('.container-lottie-static img');
    const animatedElements = document.querySelectorAll('.container-lottie-animated dotlottie-player');
    const totalElements = staticElements.length + animatedElements.length;
    let clickedElements = new Set();

    window.addEventListener('load', function() {
        loader.style.display = 'none';
    });

    function updateText(element) {
        if (textDisplay) {
            textDisplay.innerText = element.getAttribute('data-text') || '';
            texto2.style.display = 'none';
        }
    }

    function handleElementClick(element) {
        document.querySelectorAll('.clicked').forEach(el => el.classList.remove('clicked'));
        element.classList.add('clicked');

        updateText(element);

        if (element.tagName.toLowerCase() === 'img') {
            element.src = element.getAttribute('data-clicked') || element.src;
        } else if (element.tagName.toLowerCase() === 'dotlottie-player') {
            const clickedSrc = element.getAttribute('data-clicked');
            if (clickedSrc) {
                element.load(clickedSrc);
            }
        }

        clickedElements.add(element);

        if (clickedElements.size === totalElements) {
            showFinalText();
        }
    }

    function showFinalText() {
        const finalText = '"Atento ao que sou e vejo, Torno-me eles e não eu."';
        textDisplay.innerText = finalText;
        textDisplay.style.display = 'block';
        texto2.style.display = 'none';
        animatedElements.forEach(player => {
            if (player.isLoaded) {
                player.play();
            }
        });
    }
    staticElements.forEach((img) => {
        img.addEventListener('click', () => handleElementClick(img));});

    animatedElements.forEach((lottie) => {
        lottie.addEventListener('click', () => handleElementClick(lottie));
        lottie.addEventListener('load', () => {
            lottie.isLoaded = true; });
    });

    lottiePlayers.forEach(player => {
        let isPlaying = false;

        player.addEventListener('mouseenter', () => {
            if (!isPlaying && player.isLoaded) {
                player.play();
                isPlaying = true;
            }});

        player.addEventListener('mouseleave', () => {
            if (player.isLoaded) {
                player.stop();
                isPlaying = false;
            }
        });

        player.addEventListener('click', () => {
            player.classList.toggle('color-change');
            if (player.isLoaded) {
                player.play();
            }
        });

        player.addEventListener('load', () => {
            player.isLoaded = true;
        });
    });
});