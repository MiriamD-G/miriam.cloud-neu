const toTop = document.querySelector('.scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        toTop.classList.add('show');
    } else {
        toTop.classList.remove('show');
    }
})
