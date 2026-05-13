(function () {
    var audio = document.getElementById('bgMusic') || document.querySelector('audio');
    if (!audio) return;

    var rawSrc = audio.getAttribute('src');
    if (!rawSrc) {
        var source = audio.querySelector('source');
        rawSrc = source ? source.getAttribute('src') : '';
    }
    if (!rawSrc) return;

    var stateKey = 'hb_music_state_' + rawSrc;
    var savedState = null;

    try {
        savedState = JSON.parse(localStorage.getItem(stateKey) || 'null');
    } catch (error) {
        savedState = null;
    }

    function saveState() {
        var state = {
            time: audio.currentTime || 0,
            paused: audio.paused
        };
        localStorage.setItem(stateKey, JSON.stringify(state));
    }

    function tryPlay() {
        var playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(function () {
                document.addEventListener('click', tryPlay, { once: true });
            });
        }
    }

    audio.addEventListener('loadedmetadata', function () {
        if (savedState && typeof savedState.time === 'number' && savedState.time > 0) {
            var duration = isFinite(audio.duration) ? audio.duration : Number.MAX_VALUE;
            audio.currentTime = Math.min(savedState.time, Math.max(duration - 0.2, 0));
        }

        if (!savedState || savedState.paused === false) {
            tryPlay();
        }
    });

    audio.addEventListener('play', saveState);
    audio.addEventListener('pause', saveState);
    audio.addEventListener('timeupdate', saveState);
    window.addEventListener('pagehide', saveState);
    window.addEventListener('beforeunload', saveState);
})();
