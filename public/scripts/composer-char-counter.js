// $(document).ready(function () {
//   const tweetBox = document.getElementById("tweet-text")
//   console.log(tweetBox)
//   tweetBox.addEventListener("click", function() {
//     console.log("Richo, you clicked on the text box!")
//   })
//   tweetBox.addEventListener("input", function() {
//     console.log("Richo is typing!")
//   })
// });

$(document).ready(function () {
  const tweetBox = document.getElementById("new-tweet-text-area")
  $(tweetBox).on("input", function () {
    let remainingCharacters = (140 - $(this).val().length)
    $(".counter").val(remainingCharacters)    
  })
});

// let counter = $(this).parent().siblings()
    // console.log("Counter:", counter)
    //counter.text(remainingCharacters)

