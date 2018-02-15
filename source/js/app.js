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

function initMap() {
  var uluru = {lat: 59.938794, lng: 30.323083};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: 59.9391, lng: 30.319435}
  });
  var image = "/img/map-pin.png";
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: image
  });
}

function closeMenu() {
  navMain.classList.remove('main-nav--opened');
  navMain.classList.add('main-nav--closed');
}

function openMenu() {
  navMain.classList.remove('main-nav--closed');
  navMain.classList.add('main-nav--opened');
}
