var pressStartTime = null;
var pressTimeout = null;

var loader = document.getElementById("preloader");
window.addEventListener("load", function(){
        loader.style.display="none";
});

const colorFilters = [
    'hue-rotate(0deg)',
    'hue-rotate(90deg)',
    'hue-rotate(180deg)',
    'hue-rotate(270deg)',
    'sepia(100%)',
    'invert(100%)',
    'grayscale(100%)',
    'saturate(200%)'
];

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (pressStartTime === null) {
            pressStartTime = Date.now();
            pressTimeout = setTimeout(function() {
                showRandomSvg();
            }, 500);
        }
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        clearTimeout(pressTimeout);
        pressStartTime = null;
    }
});

const svgIds = ['alvarobolha', 'alvarobolha2', 'alvarobolha3', 'alvarobolha4'];

function getRandomSvgId() {
    const randomIndex = Math.floor(Math.random() * svgIds.length);
    return svgIds[randomIndex];
}

function showRandomSvg() {
    const newSvgId = getRandomSvgId();
    const templateSvg = document.getElementById(newSvgId);
    const container = document.getElementById('container');

    const newSvg = templateSvg.cloneNode(true);
   container.style.display = 'block';
    newSvg.style.display = 'block';
    newSvg.style.position = 'absolute';
    newSvg.classList.add('fumodepois');

    var randomLeft = Math.random() * 80;
    var randomWidth = Math.random() * 15 + 7;
    newSvg.style.setProperty('--esq-vw', `${randomLeft}vw`);
    newSvg.style.setProperty('--width-vw', `${randomWidth}vw`);

    document.getElementById('fumo-container').appendChild(newSvg);
}

document.querySelectorAll('.element2').forEach(img => {
    let currentFilterIndex = 0;
    img.addEventListener('click', () => {
        currentFilterIndex = (currentFilterIndex + 1) % colorFilters.length;
        img.style.filter = colorFilters[currentFilterIndex];
    });

    const candeeiros = document.querySelectorAll('#candeeiro1, #candeeiro2');
candeeiros.forEach((candeeiro, index) => {
    candeeiro.addEventListener('click', () => {
        console.log('Candeeiro clicked:', candeeiro);
        const dangleClass = index % 2 === 0 ? 'dangle1' : 'dangle2';
        candeeiro.classList.add(dangleClass);
        
        setTimeout(() => {
            candeeiro.classList.remove(dangleClass);
        }, 1000);
    });
});

let currentWindowIndex = 0;
const windowImages = document.querySelectorAll('.janelas .element3');

function changeWindow() {

    windowImages[currentWindowIndex].style.display = 'none';

    currentWindowIndex = (currentWindowIndex + 1) % windowImages.length;
    
    windowImages[currentWindowIndex].style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const janelasContainer = document.querySelector('.janelas');
    if (janelasContainer) {
        janelasContainer.addEventListener('click', changeWindow);
    }
    if (windowImages.length > 0) {
        windowImages[0].style.display = 'block';
    }
});

});