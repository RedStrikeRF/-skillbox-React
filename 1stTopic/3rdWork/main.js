const scrollButton = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    scrollButton.classList.add('show');
  } else {
    scrollButton.classList.remove('show');
  }
}, { passive: true });

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
