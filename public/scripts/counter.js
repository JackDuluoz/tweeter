
$(document).ready(function () {
  const tweetBox = document.getElementById("new-tweet-text-area")
  $(tweetBox).on("input", function () {
    let remainingCharacters = (140 - $(this).val().length)
    $('.counter').val(remainingCharacters)  
  })
});

