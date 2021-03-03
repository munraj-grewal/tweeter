$(document).ready(function(){
  //creates a new article for each new tweet the user creates
  function createTweetElement(tweet) {
    const dateObj = new Date(tweet.created_at);
    const today = Date.now();
    const timeDiff = Math.floor((today - dateObj) / 1000 / 60 / 60 / 24);

    return (
      `<article class="submitted-tweet">
        <header class="tweet-header">
          <div class="tweet-user-profile">
            <img src="${tweet.user.avatars}" alt="user's avatar">
            <p class="username">${tweet.user.name}</p>
          </div>
          <span class="user-handle">${tweet.user.handle}</span>
        </header>
        <p class="composed-tweet-message">${tweet.content.text}</p>
        <footer class="tweet-footer">
          <p class="date-posted">${timeDiff} days ago</p>
          <div class="footerIcons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`
    );
  }
  //function to get the stored tweets 
  function renderTweets (tweets) {
    for(let tweet of tweets){
      $("#tweets-container").prepend($(createTweetElement(tweet)));
    }
  }
  //create and show tweet when form is submitted
  $("form").on("submit",function(event){
    event.preventDefault(event);
    let serial= $(this).serialize();
    console.log(serial)
    if(serial.length < 141){
      if ($(".error").is(":visible")){
        $(".error").slideUp();
      }
      if(serial.length > 5){
        if ($(".error2").is(":visible")){
          $(".error2").slideUp();
        }
        $.post('/tweets', serial, function(response) {
          $('#tweet-text').val('');
          $('.counter').val('140');
          loadLastTweet();
        });
      } else {
        $(".error2").slideDown();
        $(".error").slideUp();
      } 
    } else {
      $(".error").slideDown();
      $(".error2").slideUp();

    } 
    
  });
  //function to show the tweets on the page
  function loadTweets() {
    $.get("/tweets", function(response) {
      renderTweets(response);
    })
  }
  //function to show the most recent tweet
  function loadLastTweet() {
    $.get("/tweets", function(response) {
      $("#tweets-container").prepend($(createTweetElement(response[response.length -1])));
    })
  }
  //show/hide the create new tweet form
  $("#new-tweet-button").click(function(event){
    if ($(".new-tweet").is(":visible") ){
      $(".new-tweet").slideUp();
    } else {
      $(".new-tweet").slideDown();
    }
  });
  $(".error").slideUp();
  $(".error2").slideUp();
  $(".new-tweet").slideUp();
  loadTweets();
});