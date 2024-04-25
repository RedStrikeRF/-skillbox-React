document.addEventListener('DOMContentLoaded', function() {
  const scrollButton = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > 100) {
          scrollButton.classList.add('show');
      } else {
          scrollButton.classList.remove('show');
      }
  }, { passive: true });

  scrollButton.addEventListener('click', scrollToTop);
});

function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}
