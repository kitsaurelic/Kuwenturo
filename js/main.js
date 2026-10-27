// Kuwenturo front-end entry point.
document.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('.btn-pill');
  if (start) {
    start.addEventListener('click', () => {
      console.log('Simulan!');
    });
  }
});
