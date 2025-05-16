const burger = document.querySelector('.burger');
const navMenu = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  burger.classList.toggle('none')
});
