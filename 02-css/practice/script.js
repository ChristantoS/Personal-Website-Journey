/*----- Section Tab Animation ----- */
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section')

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');

        // Delete "active" class from all button and section
        navButtons.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Adding "active" class for selecten button and section
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});



/* ----- Portfolio Card Toggle ----- */
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