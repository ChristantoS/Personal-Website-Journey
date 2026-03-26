alert("JS Jalan");

const allCards = document.querySelectorAll('.project-card');

allCards.forEach(card => {

    card.addEventListener('click', () => {
        console.log("Kamu baru saja klik kartu:", card.querySelector('.project-card-title').innerText);

        card.classList.toggle('is-expanded');

        allCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('is-expanded');
            }
        });
    });
});