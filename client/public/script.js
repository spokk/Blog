let mobileBtn = document.querySelector('.navbar__mobile-btn');
let mobileMenu = document.querySelector('.navbar__list');
mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('navbar__list--mobile-open')); //open/close mobile menu
mobileMenu.addEventListener('click', e =>
  e.target.tagName === 'A' ? mobileMenu.classList.remove('navbar__list--mobile-open') : false
); //close menu when click on link
