//================ TYPING ANIMATION
let loopCount = 0;

const textElement = document.getElementById('typing-text');
//const, kalau udah diisi nilainya ga boleh diubah sepanjang kode

const phrases = ["whoami", "Christanto"];
let phraseIndex = 0; //Mulai dari kalimat pertama
//let, nilainya bisa berubah-ubah seiring jalannya program
let charIndex = 0; //Mulai dari huruf pertama
let isDeleting = false; //Status apakah sedang mengapus atau mengetik, false = mengetik

function typeEffect() {
    loopCount++;
    if(loopCount > 500) return;

    const currentPhrase = phrases[phraseIndex];

    if(isDeleting) { // Pakai isDeleting
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    // Ganti 'typing' jadi 'isDeleting'
    let typeSpeed = isDeleting ? 100 : 150; 

    if(!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 5000; 
        isDeleting = true; // Ganti 'typing' jadi 'isDeleting'
    } 
    else if(isDeleting && charIndex === 0) {
        isDeleting = false; // Ganti 'typing' jadi 'isDeleting'
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    console.log("Index now: ", charIndex);
    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);


//================= SPACE INTERACTION
window.addEventListener('keydown', function(e) { 

    // Perbaikan: Pakai e.code untuk string "Space"
    if(e.keyCode === 32 || e.code === "Space") {

        // Perbaikan: Tambahkan kurung () karena ini fungsi
        e.preventDefault();

        document.body.classList.add('allow-scroll');

        const aboutSection = document.getElementById('about');
        if(aboutSection) {
            aboutSection.scrollIntoView({behavior: 'smooth'});
        }

        const navbar = document.getElementById('navbar');
        if(navbar) {
            navbar.classList.add('visible');
        }

        console.log("Access Granted: Welcome User!");
    }
});

/*
const bgMusic = new Audio(backsound.mp3);
bgMusic.loop = true; //Biar mutar terus

function playMusic() {
    bgMusic.play().catch(error => {
        console.log("Autoplay dicegah")
    })
}
*/