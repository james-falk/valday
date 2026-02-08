// Configuration
// State
let currentScene = 1;
let noBtnClickCount = 0;
let yesClickCount = 0;
const maxYesClicks = 5; // Number of clicks before explosion

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    setupEventListeners();
});

// Create floating hearts background
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }, 300);
}

// Setup event listeners
function setupEventListeners() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const continueBtn2 = document.getElementById('continueBtn2');
    const continueBtn3 = document.getElementById('continueBtn3');
    const replayBtn = document.getElementById('replayBtn');
    
    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('click', handleNoClick);
    noBtn.addEventListener('mouseenter', handleNoHover);
    continueBtn2.addEventListener('click', () => switchScene(4));
    continueBtn3.addEventListener('click', () => switchScene(5));
    replayBtn.addEventListener('click', resetAnimation);
}

// Handle Yes button click
function handleYesClick() {
    yesClickCount++;
    const head = document.getElementById('explodingHead');
    const yesBtn = document.getElementById('yesBtn');
    
    if (yesClickCount < maxYesClicks) {
        // Grow the head with each click
        const newScale = 1 + (yesClickCount * 0.4);
        gsap.to(head, {
            scale: newScale,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
        
        // Shake effect
        gsap.to(head, {
            rotation: Math.random() * 20 - 10,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
        
    } else {
        // EXPLOSION!
        explodeHead(head);
        
        // After explosion, continue to next scene
        setTimeout(() => {
            switchScene(3);
            yesClickCount = 0; // Reset counter
        }, 2000);
    }
}

// Explode the head into particles
function explodeHead(head) {
    const headRect = head.getBoundingClientRect();
    const centerX = headRect.left + headRect.width / 2;
    const centerY = headRect.top + headRect.height / 2;
    
    // Hide the original head
    gsap.to(head, {
        opacity: 0,
        duration: 0.1
    });
    
    // Create explosion particles
    const particleCount = 100;
    const colors = ['#ff6b9d', '#c06c84', '#667eea', '#764ba2', '#f093fb', '#FFD700', '#FF6347', '#FF69B4'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 15 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        particle.style.zIndex = '1000';
        particle.style.pointerEvents = 'none';
        
        document.body.appendChild(particle);
        
        // Random explosion direction
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 500 + 200;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        gsap.to(particle, {
            x: x,
            y: y,
            rotation: Math.random() * 720,
            opacity: 0,
            duration: Math.random() * 1 + 1,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
    
    // Screen shake effect
    gsap.to('body', {
        x: 10,
        duration: 0.05,
        repeat: 10,
        yoyo: true,
        ease: "sine.inOut",
        onComplete: () => {
            gsap.set('body', { x: 0 });
        }
    });
    
    // Celebrate with confetti too
    createConfetti();
}

// Handle No button click (make it grow and the yes button bigger)
function handleNoClick() {
    noBtnClickCount++;
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Make yes button bigger
    const currentScale = 1 + (noBtnClickCount * 0.2);
    gsap.to(yesBtn, {
        scale: currentScale,
        duration: 0.3,
        ease: "back.out"
    });
    
    // Make no button smaller
    gsap.to(noBtn, {
        scale: Math.max(0.5, 1 - (noBtnClickCount * 0.15)),
        duration: 0.3
    });
    
    // Shake the scene
    gsap.to('.main-title', {
        x: -10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Handle No button hover - make it run away
function handleNoHover() {
    const noBtn = document.getElementById('noBtn');
    const container = noBtn.parentElement;
    const containerRect = container.getBoundingClientRect();
    
    // Random position within the button container area
    const maxX = 200;
    const maxY = 100;
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    gsap.to(noBtn, {
        x: randomX,
        y: randomY,
        duration: 0.3,
        ease: "power2.out"
    });
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#667eea', '#764ba2', '#f093fb'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        gsap.to(confetti, {
            x: (Math.random() - 0.5) * 1000,
            y: Math.random() * 800 - 200,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
}

// Switch between scenes
function switchScene(sceneNumber) {
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => scene.classList.remove('active'));
    
    const targetScene = document.getElementById(`scene${sceneNumber}`);
    targetScene.classList.add('active');
    
    currentScene = sceneNumber;
    
    // Clear adventure interval when leaving scene 3
    if (sceneNumber !== 3) {
        clearAdventureInterval();
    }
    
    if (sceneNumber === 3) {
        animateBeachScene();
    } else if (sceneNumber === 4) {
        animateRocketScene();
    } else if (sceneNumber === 5) {
        animateFinalScene();
    }
}

// Animate beach scene
function animateBeachScene() {
    // Hide continue button initially
    const continueBtn = document.getElementById('continueBtn2');
    continueBtn.style.opacity = '0';
    
    // Show continue button after 15 seconds
    setTimeout(() => {
        continueBtn.style.opacity = '1';
    }, 15000);
    
    // Timeline scrolls automatically via CSS animation
    // No need for interval-based background switching
}

// Clear the adventure interval when leaving scene 3 (kept for compatibility)
function clearAdventureInterval() {
    if (window.adventureInterval) {
        clearInterval(window.adventureInterval);
        window.adventureInterval = null;
    }
}

// Animate rocket scene
function animateRocketScene() {
    const rocket = document.getElementById('rocket');
    const moonMessage = document.getElementById('moonMessage');
    const continueBtn = document.getElementById('continueBtn3');
    const pets = document.querySelectorAll('.pet');
    const flames = document.querySelectorAll('.flame');
    
    // Ensure flames are visible and animating
    flames.forEach(flame => {
        flame.style.display = 'block';
        flame.style.opacity = '1';
    });
    
    // Rocket launch sequence
    gsap.to(rocket, {
        bottom: '50%',
        duration: 3,
        ease: "power2.inOut",
        onStart: () => {
            // Add shake effect during launch
            gsap.to(rocket, {
                x: '+=5',
                duration: 0.1,
                repeat: 30,
                yoyo: true,
                ease: "sine.inOut"
            });
            
            // Make pets swing wildly during launch
            pets.forEach((pet, index) => {
                gsap.to(pet, {
                    rotation: index % 2 === 0 ? 360 : -360,
                    duration: 1.5,
                    repeat: 2,
                    ease: "power1.inOut"
                });
            });
        }
    });
    
    // Rocket continues to moon
    gsap.to(rocket, {
        bottom: '180%',
        right: '10%',
        scale: 0.4,
        duration: 4,
        delay: 3,
        ease: "power1.in",
        onStart: () => {
            // Pets start trailing more dramatically
            pets.forEach((pet, index) => {
                gsap.to(pet, {
                    scale: 0.6,
                    duration: 2,
                    ease: "power1.in"
                });
                
                // Add continuous spinning for dramatic effect
                gsap.to(pet, {
                    rotation: '+=720',
                    duration: 4,
                    ease: "power1.in"
                });
            });
        },
        onComplete: () => {
            // Show moon message after rocket reaches moon
            gsap.to(moonMessage, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            });
            
            // Show continue button
            gsap.to(continueBtn, {
                opacity: 1,
                duration: 0.5,
                delay: 1
            });
        }
    });
}

// Animate final scene
function animateFinalScene() {
    const finalImage = document.querySelector('.final-page-image');
    
    // Animate the image entrance
    gsap.from(finalImage, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
    });
    
    // Animate message box
    const messageBox = document.querySelector('.message-box');
    gsap.from(messageBox, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5
    });
}

// Reset animation
function resetAnimation() {
    noBtnClickCount = 0;
    yesClickCount = 0;
    
    // Reset button scales and text
    gsap.set('#yesBtn', { scale: 1, x: 0, y: 0 });
    gsap.set('#noBtn', { scale: 1, x: 0, y: 0 });
    document.getElementById('yesBtn').textContent = 'Yes!';
    
    // Reset head
    const head = document.getElementById('explodingHead');
    gsap.set(head, { scale: 1, rotation: 0, opacity: 1 });
    
    switchScene(1);
}
