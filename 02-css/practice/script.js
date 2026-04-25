//================ TYPING ANIMATION
const textElement = document.getElementById('typing-text');
//const, kalau udah diisi nilainya ga boleh diubah sepanjang kode

const phrases = ["whoami", "Christanto"];
let phraseIndex = 0; //Mulai dari kalimat pertama
//let, nilainya bisa berubah-ubah seiring jalannya program
let charIndex = 0; //Mulai dari huruf pertama
let isDeleting = false; //Status apakah sedang mengapus atau mengetik, false = mengetik

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    //Logika hapus dan ketik
    if(isDeleting) {
        //Ambil teks dari huruf ke-0 hingga huruf ke-(index sekarang - 1)
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        //Ambil teks dari huruf ke-0 hingga huruf ke-(index sekarang + 1)
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    //Penentu kecepatan (ketik vs hapus)
    let typeSpeed = isDeleting ? 100 : 150;

    //Jika kalimat sudah lengkap, diketik
    if(!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 5000; //5 detik durasinya
        isDeleting = true;
    }
    //Jika kalimat sudah habis, dihapus
    else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; //Ganti ke kalimat berikutnya
        typeSpeed = 500;
    }

    //Jalankan ulang fungsi ini setelah 'typeSpeed' milidetik
    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);


//================= SPACE INTERACTION
window.addEventListener('keydown', function(e) { //Listener tombol keyboard

    //Pengecekan apakah tombol yang ditekan SPACE (kode 32)
    if(e.keyCode === 32 || e.keyCode === "Space") {

        //Cegah halaman geser sedikit karena default behaviour spasi
        e.preventDefault;

        //Buka kunci scroll body
        document.body.classList.add('allow-scroll');

        //Langsung scroll ke section "About"
        const aboutSection = document.getElementById('about');
        aboutSection.scrollIntoView({behavior: 'smooth'});

        //Kalau udah ada music bisa diplay
        //playMusic();

        console.log("Space pressed! Portal Opened.")
    }

    document.getElementById('navbar').classList.add('visible');
});

/*Menambahkan musik
const bgMusic = new Audio('nama file musiknya');
bgMusic.loop = true; //Biar mutar terus

function playMusic() {
    bgMusic.play().catch(error => {
        console.log("Autoplay dicegah")
    })
}
*/