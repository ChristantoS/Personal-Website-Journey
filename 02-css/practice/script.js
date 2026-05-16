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

    //Pakai e.code untuk string "Space"
    if(e.keyCode === 32 || e.code === "Space") {

        //Tambahkan kurung () karena ini fungsi
        e.preventDefault();

        //Kalau akses belum pernah diberikan (first access)
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

            //Musik dinyalakan begitu spasi ditekan
            music.play();
            playBtn.textContent = '⏸';

            //Tandai kalau sudah pernah diakses
            isAccessGranted = true;

            console.log("Access Granted: Welcome User!");
        }
    }
});

//================= MUSIC PLAY

playBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playBtn.textContent = '⏸'; //Ganti jadi pause
    } else {
        music.pause();
        playBtn.textContent = '▶'; //Ganti jadi play
    }
})

//================= MUSIC DURATION
music.addEventListener('timeupdate', () => {
    const progressBar = document.querySelector('.progress-bar');

    //Duration harus udah diload (biar ga usah dibagi nol)
    if(!isNaN(music.duration)) {
        const progressPercent = (music.currentTime / music.duration) * 100;

        //Ubah lebar CSS nya biar efek penambahan durasi kerasa
        progressBar.style.width = `${progressPercent}%`;
    }
})

//================= MUSIC DURATION BAR
const progressContainer = document.querySelector('.progress-container');

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth; //Total lebar
    const clickX = e.offsetX; //Titik user klik
    const duration = music.duration; //Total durasi lagu

    //Set lagu berdasarkan posisi bar
    music.currentTime = (clickX / width) * duration;

})

//================= MUSIC VOLUME CONTROL
volumeControl.addEventListener('input', (e) => {
    // Ambil nilai slider (0.0 - 1.0)
    const volumeValue = parseFloat(e.target.value);
    
    // Terapkan ke audio
    music.volume = volumeValue;

    // Ganti ikon berdasarkan tingkat volume
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
const projectsGrid = document.querySelector('.projects-grid');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

    //Sekali geser dapat berapa pixel (gap + lebar kartu)
const scrollAmountR = 320;

nextBtn.addEventListener('click', () => {
    projectsGrid.scrollBy({
        left: scrollAmount,
        behavior: 'smooth' //Biar gesernya gak patah
    })
})

prevBtn.addEventListener('click', () => {
    projectsGrid.scroll({
        right: scrollAmount,
        behavior: 'smooth'
    })
})