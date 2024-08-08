document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const background = document.getElementById('background-image');
    const backgroundAudio = document.getElementById('background-audio');

    const audioContainer = document.querySelector('.audios');
    if (audioContainer) {
        const audioElements = audioContainer.querySelectorAll('audio');
        audioElements.forEach(audio => {
            audio.volume = 0.2;
        });
    }

    if (backgroundAudio) {
        backgroundAudio.loop = true;
        backgroundAudio.volume = 0.15;
        backgroundAudio.play();
    }

    let currentAudio = null;
    const positionedGifs = new Set();
    let playingBackgroundAudios = new Set();

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    background.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    background.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const droppedImage = document.getElementById(id);

        if (!droppedImage) {
            return;
        }

        const rect = background.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gifMapping = {
            'png1': 'floresG.GIF',
            'png2': 'rioG.GIF',
            'png3': 'sheepG.GIF',
            'png4': 'nuvem.GIF',
            'png5': 'aldeia.GIF',
            'png6': 'sol.GIF',
            'png7': 'arvore.GIF',
            'png8': 'borboleta.GIF'
        };

        const audioMapping = {
            'floresG.GIF': ['gif-flores-audio'],
            'rioG.GIF': ['gif-rio-audio'],
            'sheepG.GIF': ['gif-ovelha-audio'],
            'aldeia.GIF': ['gif-lapide-audio'],
            'nuvem.GIF': ['gif-nuvem-audio'],
            'sol.GIF': ['gif-sol-audio'],
            'arvore.GIF': ['gif-arvore-audio'],
            'borboleta.GIF': ['gif-borboleta-audio']
        };
        
        const backgroundAudioMapping = {
            'rioG.GIF': 'gif-rio-background-audio',
            'sheepG.GIF': 'gif-ovelha-background-audio',
            'arvore.GIF': 'gif-arvore-background-audio'
        };

        const newGif = gifMapping[id];
        if (newGif) {
            if (positionedGifs.has(newGif)) {
                    droppedImage.style.left = `${x - (droppedImage.width / 2)}px`;
                    droppedImage.style.top = `${y - (droppedImage.height / 2)}px`;
                return;
            }

            droppedImage.src = `images/Alberto/${newGif}`;

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            const newAudioId = audioMapping[newGif][0];
            if (newAudioId) {
                currentAudio = document.getElementById(newAudioId);
                if (currentAudio) {
                    currentAudio.load();
                    currentAudio.play();
                }
            }

            const backgroundAudioId = backgroundAudioMapping[newGif];
            if (backgroundAudioId) {
                const backgroundAudio = document.getElementById(backgroundAudioId);
                if (backgroundAudio && !playingBackgroundAudios.has(backgroundAudioId)) {
                    backgroundAudio.loop = true;
                    backgroundAudio.volume = 0.1;
                    backgroundAudio.play();
                    playingBackgroundAudios.add(backgroundAudioId);
                }
            }


            if (newGif === 'sheepG.GIF') {
                droppedImage.classList.add('sheep-gif');
            } else if (newGif === 'floresG.GIF'){
                droppedImage.classList.add('flores-gif');
            } else if (newGif === 'rioG.GIF'){
                droppedImage.classList.add('rio-gif');
            } else if (newGif === 'nuvem.GIF'){
                droppedImage.classList.add('nuvem-gif');}
                else if (newGif === 'arvore.GIF'){
                    droppedImage.classList.add('arvore-gif')}
                    else if (newGif === 'borboleta.GIF'){
                        droppedImage.classList.add('borboleta-gif')}else{
                droppedImage.classList.add('draggable1');
            }

            droppedImage.style.position = 'absolute';
            if (newGif === 'borboleta.GIF') {

                droppedImage.style.left = '0vw';
                droppedImage.style.position = 'fixed';
                droppedImage.draggable = false;
            }
               else {
                droppedImage.style.left = `${x - (droppedImage.width / 2)}px`;
                droppedImage.style.top = `${y - (droppedImage.height / 2)}px`;
                droppedImage.draggable = true;
            }

            positionedGifs.add(newGif);

            droppedImage.parentNode.removeChild(droppedImage);
            
            background.appendChild(droppedImage);
        }
    });
});
