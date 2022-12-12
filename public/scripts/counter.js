
$(document).ready(function () {
  const textArea = $("#new-tweet-text-area");
  textArea.on("input", function () {
    let remainingCharacters = (140 - $(this).val().length);
    const counter = $('.counter');
    counter.val(remainingCharacters);
    if (remainingCharacters < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});

