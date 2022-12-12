
$(document).ready(function () {

  // Load database tweets on page load
  loadTweets();

  // Assign variables to html elements for reuse 
  const newTweetBox = $('#tweet-text-box');
  const newTweetText = $("#new-tweet-text-area");
  const existingTweets = $('.historical-tweets')
  const counter = $('.counter');
  
  // Event handler for new tweet form submission
  newTweetBox.on('submit', function (event) {
    
    // Overrides default form submission mechanism
    event.preventDefault();

    // Error handling for invalid tweets
    if (newTweetText.val() === "") {
      showError("You tried to submit an empty tweet.");
      return;
    }

    if (newTweetText.val().length > 140) {
      showError("Your tweet is longer than 140 characters.");
      return;
    }

    // If no errors, post the tweet to /tweets route
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      
    // Then empty the container for existing tweets, reload the updated tweets database,
    // and reset the form and character counter  
      .then(() => {
        existingTweets.empty();
        loadTweets();
        newTweetText.val("");
        counter.val(140);
      });
    
  });

});

// Function for getting tweets using an AJAX get request
const loadTweets = function () {
  $.ajax('/tweets', {
    method: 'GET'
  })
    .then((tweets) => {
      renderTweets(tweets);
    });
};

// Function that adds the submitted tweet to the top of existing tweets 
const renderTweets = function(tweets) {
  const existingTweets = $('.historical-tweets')
  for (let tweet of tweets) {
    existingTweets.prepend(createTweetElement(tweet));
  }
};

// Function creates a tweet using html template literals
const createTweetElement = function (tweet) {
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
  </article>`);
  return $tweet;
};

// Function for displaing error messages using slideDown/hide
const showError = (errorMessage) => {
  const existingTweets = $('.historical-tweets')
  existingTweets.prepend(
    $("<span class='error'>").slideDown()
      .text(errorMessage)
      .css('color', 'red')
      .delay(2400)
      .hide(600)
  );
};

// Provided function for preventing cross-site scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};