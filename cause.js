 // Reasons database
 const reasons = [
    { 
        text: "na evloo adikrnoo kadikrnooo avloo pasammm💖terinchikooooooo", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "kollukuu mollukuu paiyaaaa! epaiyum ipdiye iruu 😘 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "heart full ah pasammmm nii panatha mosammm 😂 ", 
        emoji: "💕",
        gif: "gif3.gif"
    },
    { 
        text: "yercaud povomaaa ipdii thirumbaaa😉ena nuu teriyutha?!!😂 ", 
        emoji: "🌟",
        gif: "gif4.mp4" 
    },
    { 
        text: "the wayy you pampers mee is unexplainableee!🫠", 
        emoji: "💕",
        gif: "gif5.gif"
    },
    { 
        text: "you are my bestfriendddddddd okayyyyyyy!💖", 
        emoji: "😍",
        gif: "gif6.mp4"
    },
    { 
        text: "epaiyummmmm sirichiteyyyy iruknaummmm!bczzzz youu have mee okay!!😘", 
        emoji: "💗",
        gif: "gif7.mp4"
    },
    { 
        text: "no one ever tolerate mee like youuuuuuuuuuuu!💖", 
        emoji: "🥰",
        gif: "gif9.mp4"
    },
    { 
        text: "you areee the personn who can take care mee like a babyy and handle with patience and care and loveeeee!💛", 
        emoji: "💛",
        gif: "gif8.mp4"
    },
    { 
        text: "you are thee onee i share my weakness withhh!!💖", 
        emoji: "🥰",
        gif: "gif10.mp4"
    },
    { 
        text: "you are the onee whoo not only bring my smile u bring back my innerchildd 🤗", 
        emoji: "🤗",
        gif: "gif11.mp4"
    },
    { 
        text: " withh youu evrthing feels peaceful!🫠", 
        emoji: "😉",
        gif: "gif12.mp4"
    },
    { 
        text: "late night talks and random conversations with youu are the bestttt!💖", 
        emoji: "👻",
        gif: "gif13.mp4"
    },
    { 
        text: "MY HOME🫠💕", 
        emoji: "😘",
        gif: "gif14.mp4"
    },
    { 
        text: "MY PEACE🫠💕", 
        emoji: "🌈",
        gif: "gif15.mp4"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    if (reason.gif.includes('http') || reason.gif.endsWith('.mp4')) {
        gifOverlay.innerHTML = `<video src="${reason.gif}" autoplay loop muted alt="Friendship Memory"></video>`;
    } else {
        gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    }
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Happy Times!!💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🫠', '✨', '💖', '🦋', '💗','😘','💕','🥰','🫠','💗','😘','💕','💗','🫠'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);