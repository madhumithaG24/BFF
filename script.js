// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});



function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// Create floating elements (background party confetti)
const floatingElements = ['💖', '✨', '💗', '💫', '💕','💗','😘','💕','🥰','🫠'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -600,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        duration: Math.random() * 8 + 8,
        opacity: 0,
        ease: "power1.out",
        onComplete: () => element.remove()
    });
}

// Create full-screen floating icon layer
function createCenterIcons() {
    const icons = ['💖', '✨', '😘', '💫', '💕','💗','😘','💕','🥰','🫠'];
    const layer = document.querySelector('.center-icons');
    for (let i = 0; i < 12; i++) {
        const span = document.createElement('span');
        span.textContent = icons[i % icons.length];
        span.style.left = Math.random() * 90 + 'vw';
        span.style.top = Math.random() * 90 + 'vh';
        const duration = 8 + Math.random() * 7;
        const deltaX = (Math.random() * 140 - 70);
        const deltaY = (Math.random() * 140 - 70);
        const scale = 0.8 + Math.random() * 0.8;

        gsap.to(span, {
            x: deltaX,
            y: deltaY,
            scale: scale,
            opacity: 0.9,
            duration: duration,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });

        layer.appendChild(span);
    }
}

window.addEventListener('load', createCenterIcons);

// Initialize animations
window.addEventListener('load', () => {
    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    setInterval(createFloating, 1000);
});

// Hover effects
       // Hover effects
       document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.3
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3
            });
        });

        // Smooth page transition on click
        button.addEventListener('click', () => {
            gsap.to('body', {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    window.location.href = 'cause.html'; // Replace with the actual URL of the next page
                }
            });
        });
    });