$(document).ready(function () {
  renderTweets(data);
  })

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// for (let datum of data) {
//   console.log(datum["user"]["name"])
// }

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $(`.historical-tweets`).append(createTweetElement(tweet))    
  }
}

const createTweetElement = function(tweet) {
  let $tweet = $(`<article class="tweet">
    <head>
      <div class="userData">
        <img class="avatars" src="${tweet["user"]["avatars"]}">
        <p class="name">${tweet["user"]["name"]}</p>
        <p class="handle">${tweet["user"]["handle"]}</p>
      </div>
    </head>
    <div class="post">
      ${tweet["content"]["text"]}
    </div>
    <footer class="interact">
      ${tweet["created_at"]}
      <p>
        <i class="fa-regular fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </p>
    </footer>
  </article>`)
  return $tweet;
}

renderTweets(data);

