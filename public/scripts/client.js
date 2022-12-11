
$(document).ready(function () {

  loadTweets()
  
  $('#tweet-text-box').on('submit', function (event) {
    event.preventDefault();
    console.log("Submit Button Disabled")

    if ($('#new-tweet-text-area').val() === "") {
      showError("You tried to submit an empty tweet.")
      return
    }

    if ($('#new-tweet-text-area').val().length > 140) {
      showError("Your tweet is longer than 140 characters.")
      return
    }

    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then(() => {
        $('.historical-tweets').empty();
        loadTweets();
        $('#new-tweet-text-area').val("")
        $('.counter').val(140)
      })
  })
})
  
const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      renderTweets(tweets);
    });
};

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $(`.historical-tweets`).prepend(createTweetElement(tweet))    
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  let $tweet = $(`<article class="tweet">
    <head>
      <div class="userData">
        <img class="avatars" src="${escape(tweet["user"]["avatars"])}">
        <p class="name">${escape(tweet["user"]["name"])}</p>
        <p class="handle">${escape(tweet["user"]["handle"])}</p>
      </div>
    </head>
    <div class="post">
      ${escape(tweet["content"]["text"])}
    </div>
    <footer class="interact">
      ${escape(timeago.format(tweet["created_at"]))}
      <p>
        <i class="fa-regular fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </p>
    </footer>
  </article>`)
  return $tweet;
}

const showError = (errorMessage) => {
  $('.historical-tweets').prepend(
    $("<span class='error'>").slideDown()
      .text(errorMessage)
      .css('color', 'red')
      .delay(2400)
      .hide(600)
    
  );
};