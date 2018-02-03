var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.header__toggle');
var toogleOnClass = "header__toggle--on";

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navToggle.classList.contains(toogleOnClass)) {
    navToggle.classList.remove(toogleOnClass);
    closeMenu();
  } else {
    navToggle.classList.add(toogleOnClass);
    openMenu();
  }
});

function closeMenu() {
  navMain.classList.remove('main-nav--opened');
  navMain.classList.add('main-nav--closed');
}

function openMenu() {
  navMain.classList.remove('main-nav--closed');
  navMain.classList.add('main-nav--opened');
}
