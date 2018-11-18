// collapsable initialization
$(document).ready(function() {
  $(".collapsible").collapsible();
  $(".modal").modal();
  $(".fixed-action-btn").floatingActionButton();
  var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
});
