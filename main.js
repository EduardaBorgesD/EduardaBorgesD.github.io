document.addEventListener('DOMContentLoaded', function() {
    const headContainers = document.querySelectorAll('.head-container');

    var loader = document.getElementById("preloader");
    window.addEventListener("load", function(){
            loader.style.display="none";
    });

    function rotateHeads(event) {
        const mouseX = event.clientX;
        const windowCenterX = window.innerWidth / 2;
        const maxRotation = 3; 
        const rotation = (mouseX - windowCenterX) / windowCenterX * maxRotation;

        headContainers.forEach(headContainer => {
            headContainer.style.transform = `rotate(${rotation}deg)`;
        });
    }

    function eyeball(event) {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(function(eye) {
            const headContainer = eye.closest('.head-container');
            if (!headContainer) return;

            const containerRect = headContainer.getBoundingClientRect();
            const containerCenterX = containerRect.left + containerRect.width / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;

            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const deltaX = mouseX - containerCenterX;
            const deltaY = mouseY - containerCenterY;

            const angle = Math.atan2(deltaY, deltaX);

            let distance = Math.min(7, Math.hypot(deltaX, deltaY) / 10);

            if (headContainer.closest('.img_alberto')) {
                distance = Math.min(4, Math.hypot(deltaX, deltaY) / 15);
            }
            else if (headContainer.closest('.img_ricardo')) {
                distance = Math.min(3.5, Math.hypot(deltaX, deltaY) / 15);
            }

            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            eye.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    window.addEventListener('mousemove', rotateHeads);
    window.addEventListener('mousemove', eyeball);

    var fernandoImage = document.getElementById("fernando-img");
    var text1 = document.querySelector(".text1");
    var albertoImage = document.getElementById("alberto-img");
    var text2 = document.querySelector(".text2");
    var alvaroImage = document.getElementById("alvaro-img");
    var text3 = document.querySelector(".text3");
    var ricardoImage = document.getElementById("ricardo-img");
    var text4 = document.querySelector(".text4");
    
    function addDropAnimation() {
        text1.classList.add("drop");
        text2.classList.add("drop");
        text3.classList.add("drop");
        text4.classList.add("drop");
    }

    function removeDropAnimation() {
        text1.classList.remove("drop");
        text2.classList.remove("drop");
        text3.classList.remove("drop");
        text4.classList.remove("drop");
    }
    
    fernandoImage.addEventListener("click", function() {
        window.location.href = "index2.html";
    });
    fernandoImage.addEventListener("mouseenter", function() {
        text1.style.display = "block";
        document.body.style.backgroundColor ="#FFDDCB";
        setTimeout(addDropAnimation, 10);
    });
    fernandoImage.addEventListener("mouseleave", function() {
        text1.style.display = "none";
        document.body.style.backgroundColor = "#FFFFFF";
    });
      

    albertoImage.addEventListener("click", function() {
        window.location.href = "index4.html";
    });
    albertoImage.addEventListener("mouseenter", function() {
        text2.style.display = "block";
        document.body.style.backgroundColor = "#B6D3AF";
        setTimeout(addDropAnimation, 10);
    });
    albertoImage.addEventListener("mouseleave", function() {
    text2.style.display = "none";
    document.body.style.backgroundColor = "#FFFFFF";
    });

      
    alvaroImage.addEventListener("click", function() {
        window.location.href = "index3.html";
    });
    alvaroImage.addEventListener("mouseenter", function() {
        text3.style.display = "block";
        document.body.style.backgroundColor = "#FFE298";
        setTimeout(addDropAnimation, 10);
    });
    alvaroImage.addEventListener("mouseleave", function() {
        text3.style.display = "none";
        document.body.style.backgroundColor = "#FFFFFF";
    });

      
    ricardoImage.addEventListener("click", function() {
        window.location.href = "index1.html";
    });
    ricardoImage.addEventListener("mouseenter", function() {
        text4.style.display = "block";
        document.body.style.backgroundColor = "#F38686";
        setTimeout(addDropAnimation, 10);
    });
    ricardoImage.addEventListener("mouseleave", function() {
        text4.style.display = "none";
        document.body.style.backgroundColor = "#FFFFFF";
    });

    const naoSei = document.querySelector('.nao-sei');
    const personagens = [fernandoImage, albertoImage, alvaroImage, ricardoImage];

    naoSei.style.display = 'block';
    personagens.forEach(img => img.style.display = 'none');


    setTimeout(() => {
        personagens[0].style.display = 'block';
        setTimeout(() => {
            personagens[1].style.display = 'block';
            setTimeout(() => {
                personagens[2].style.display = 'block';
                setTimeout(() => {
                    personagens[3].style.display = 'block';
                }, 500);
            }, 500);
        }, 500);
    }, 2000);

    const checkbox = document.querySelector('.checkbox');
    const menuItems = document.querySelector('.menu-items');
    const mainContainer = document.querySelector('.main-container');
    const text = document.querySelector('.nao-sei');

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            menuItems.style.transform = 'translateX(0)';
            mainContainer.classList.add('menu-open');
            text.classList.add('menu-open1');
        } else {
            menuItems.style.transform = 'translateX(100%)';
            mainContainer.classList.remove('menu-open');
        }
    });
});
