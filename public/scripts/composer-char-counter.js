$(document).ready(function () {
  $("#tweet-text").on('keyup', function () {
    const max = 140;
    let input = $('#tweet-text')[0].value;
    let howMuchLeft = max - input.length;
    if (howMuchLeft > 0){
      $(this).parent().find(".counter").text(howMuchLeft);
    } else {
      $(this).parents().find(".counter").text(howMuchLeft)
      .css("color", "red");
    }
  });
});