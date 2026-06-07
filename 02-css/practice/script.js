//================ TYPING ANIMATION
let loopCount = 0;
let isAccessGranted = false;

const music = new Audio('../backsound.mp3');
const playBtn = document.getElementById('play-btn');
const volumeControl = document.getElementById('volume-control');
const volumeIcon = document.querySelector('.volume-icon');
//========================================================================================================================
music.volume = volumeControl.value;

const textElement = document.getElementById('typing-text');

const phrases = ["whoami", "Christanto"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    loopCount++;
    if(loopCount > 500) return;

    const currentPhrase = phrases[phraseIndex];

    if(isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 150; 

    if(!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 5000; 
        isDeleting = true;
    } 
    else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    console.log("Index now: ", charIndex);
    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);


//================= SPACE INTERACTION
window.addEventListener('keydown', function(e) { 

    if(e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
    }

    if(e.keyCode === 32 || e.code === "Space") {

        e.preventDefault();

        if (!isAccessGranted) {

            document.body.classList.add('allow-scroll');

            const aboutSection = document.getElementById('about');
            if(aboutSection) {
                aboutSection.scrollIntoView({behavior: 'smooth'});
            }

            const navbar = document.getElementById('navbar');
            if(navbar) {
                navbar.classList.add('visible');
            }

            music.play();
            playBtn.textContent = '⏸';

            isAccessGranted = true;

            console.log("Access Granted: Welcome User!");
        }
    }
});

//================= SCROLL DRIVEN
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            console.log(entry.target);
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    })
}, {})

const scrollElements = document.querySelectorAll(".scroll");
scrollElements.forEach(el => observer.observe(el));

//================= DECRYPTION TEXT (Non-About)
const decryptChars = "01$#/?@[]{}<>";

function startDecryptEffect(element) {
    if (element.isDecrypting) return;

    element.isDecrypting = true;

    const originalText = element.innerText;
    let iteration = 0;
    
    clearInterval(element.decryptInterval);
    
    element.decryptInterval = setInterval(() => {
        element.innerText = originalText
            .split("")
            .map((char, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return decryptChars[Math.floor(Math.random() * decryptChars.length)];
            })
            .join("");
            
        if (iteration >= originalText.length) {
            clearInterval(element.decryptInterval);
            element.innerText = originalText; 
            
            element.isDecrypting = false; 
        }
        
        iteration += 1 / 5; 
    }, 20);
}

//================= DECRYPTION TEXT (About)
document.addEventListener("DOMContentLoaded", () => {
    const aboutTitle = document.querySelector("#about h2.decrypt-effect");
    if (aboutTitle) {
        startDecryptEffect(aboutTitle);
    }
});

//================= MUSIC PLAY
playBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playBtn.textContent = '⏸';
    } else {
        music.pause();
        playBtn.textContent = '▶';
    }
})

//================= MUSIC DURATION
music.addEventListener('timeupdate', () => {
    const progressBar = document.querySelector('.progress-bar');

    if(!isNaN(music.duration)) {
        const progressPercent = (music.currentTime / music.duration) * 100;

        progressBar.style.width = `${progressPercent}%`;
    }
})

//================= MUSIC DURATION BAR
const progressContainer = document.querySelector('.progress-container');

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;

    music.currentTime = (clickX / width) * duration;

})

//================= MUSIC VOLUME CONTROL
volumeControl.addEventListener('input', (e) => {
    const volumeValue = parseFloat(e.target.value);
    
    music.volume = volumeValue;

    if (volumeValue === 0) {
        volumeIcon.textContent = '🔇';
    } else if (volumeValue < 0.5) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }

    console.log(`Volume: ${Math.round(volumeValue * 100)}%`);
});

//================= PROJECTS NAVIGATION
const projectsGrid = document.querySelector(".projects-grid");
const arrowBtn = document.querySelectorAll(".projects-wrapper i");
const firstCardWidth = projectsGrid.querySelector(".projects-card").offsetWidth;
const projectsGridChildren = [...projectsGrid.children];

let isDragging = false, startX, startScrollLeft;

let cardPerView = Math.round(projectsGrid.offsetWidth / firstCardWidth);

projectsGridChildren.slice(-cardPerView).reverse().forEach(card => {
    projectsGrid.insertAdjacentHTML("afterbegin", card.outerHTML);
});

projectsGridChildren.slice(0, cardPerView).forEach(card => {
    projectsGrid.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        projectsGrid.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    projectsGrid.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = projectsGrid.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    projectsGrid.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    projectsGrid.classList.remove("dragging");
}

const infiniteScroll = () => {
    if(projectsGrid.scrollLeft === 0) {
        projectsGrid.classList.add("no-transition");
        projectsGrid.scrollLeft = projectsGrid.scrollWidth - (2 * projectsGrid.offsetWidth);
        projectsGrid.classList.remove("no-transition");
    } else if (Math.ceil(projectsGrid.scrollLeft) === projectsGrid.scrollWidth - projectsGrid.offsetWidth) {
        projectsGrid.classList.add("no-transition");
        projectsGrid.scrollLeft = projectsGrid.offsetWidth;
        projectsGrid.classList.remove("no-transition");
    }
}

projectsGrid.addEventListener('mousedown', dragStart);
projectsGrid.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
projectsGrid.addEventListener('scroll', infiniteScroll);


//================= WRITEUP NAVIGATION
const ctfCards = document.querySelectorAll(".ctf-card");
const ctfArrowBtns = document.querySelectorAll(".ctf-wrapper i");

let ctfCurrentIndex = 0;

function updateCtfCarousel() {
    const totalCards = ctfCards.length;
    if (totalCards === 0) return;

    ctfCards.forEach(card => {
        card.classList.remove("active", "prev", "next", "far-prev", "far-next");
    });

    const activeIdx  = ctfCurrentIndex;
    const nextIdx    = (ctfCurrentIndex + 1) % totalCards;
    const farNextIdx = (ctfCurrentIndex + 2) % totalCards;
    const prevIdx    = (ctfCurrentIndex - 1 + totalCards) % totalCards;
    const farPrevIdx = (ctfCurrentIndex - 2 + totalCards) % totalCards;

    ctfCards[activeIdx].classList.add("active");
    ctfCards[nextIdx].classList.add("next");
    ctfCards[farNextIdx].classList.add("far-next");
    ctfCards[prevIdx].classList.add("prev");
    ctfCards[farPrevIdx].classList.add("far-prev");
}

ctfArrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const totalCards = ctfCards.length;
        
        if (btn.id === "ctf-left") {
            ctfCurrentIndex = (ctfCurrentIndex - 1 + totalCards) % totalCards;
        } else if (btn.id === "ctf-right") {
            ctfCurrentIndex = (ctfCurrentIndex + 1) % totalCards;
        }
        
        updateCtfCarousel();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    updateCtfCarousel();
});

//================= <h2> DECRYPT ANIMATION
const sectionObserverOptions = {
    threshold: 0.2
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const title = entry.target.querySelector("h2.decrypt-effect");
            
            if (title) {
                startDecryptEffect(title);
            }
            
            sectionObserver.unobserve(entry.target);
        }
    });
}, sectionObserverOptions);

const targetSections = document.querySelectorAll("#about, #tools, #projects, #ctf, #contact");
targetSections.forEach(section => {
    if (section) sectionObserver.observe(section);
});