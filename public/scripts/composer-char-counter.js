$(document).ready(function () {
  const $tweetInput = $("#tweet-text");

  $tweetInput.on("input", function (e) {
    const $textArea = $(this);
    const $counter = $textArea.parent().children().find("output");

    $counter.val(140 - $textArea.val().length);
    // Checks if input is the backspace
    if (e.keyCode == 8) {
      $counter.val(Number($counter.val()) + 1);
    }
    // Add or remove error css styling if counter value is under/over 0
    if ($counter.val() < 0) {
      $counter.addClass("error");
    } else {
      $counter.removeClass("error");
    }
  });
});
