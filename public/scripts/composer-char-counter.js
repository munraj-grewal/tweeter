$(document).ready(function () {
  $('#tweet-text').on('input', function() {
    let minusCounter = 140 - $(this).val().length;
    let changeCounter = $(this).siblings().children('.counter').html(minusCounter);
    changeCounter.toggleClass('minus-counter', minusCounter < 0);
  });
});