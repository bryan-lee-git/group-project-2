// this is not funtioning how i want just 

$("#selected-avatar-img").hide();

$(".swiper-slide").on("click", function(event) {
  event.preventDefault();
  console.log("i was pressed");
  var slideSource = ($(this).children("img").attr("src"));
  // $(this).children("span").attr("sortcat");
  $("#selected-character-img").attr("src", slideSource);
});
