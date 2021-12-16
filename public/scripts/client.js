$(document).ready(function () {
  // Get tweet data
  const loadTweets = function () {
    $.ajax({ url: "http://localhost:8080/tweets", method: "get" })
      .then((res) => {
        renderTweets(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loadTweets();

  // Load tweet form when clicked on
  $(".header-link").on("click", function () {
    $(".new-tweet").slideDown().css("display", "flex");
  });

  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      let result = createTweetElement(tweet);
      // takes return value and appends it to the top of the tweets container
      $("#tweets-container").prepend(result);
    }
  };

  // Make sure no JS can be inputed into form textarea
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    const $tweet = $(`
    <article>
    <header>
      <div>
        <img src="${tweet.user.avatars}" />
        <p>${tweet.user.name}</p>
      </div>
      <div class="username">
        <p>${tweet.user.handle}</p>
      </div>
    </header>
    <div>
      <p>
      ${escape(tweet.content.text)}
      </p>
    </div>
    <footer>
      <div>${timeago.format(tweet.created_at)}</div>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };

  //   FORM SUBMISSION
  const $form = $(".container form");
  $form.submit(function (event) {
    event.preventDefault();

    if ($form[0][0].value === "" || $form[0][0].value === null) {
      return $(".error-message")
        .text("Tweet content is empty")
        .slideDown()
        .removeClass("hidden");
    } else if ($form[0][0].value.length > 140) {
      return $(".error-message")
        .text("Tweet content exceeds limit")
        .slideDown()
        .removeClass("hidden");
    }
    const data = $form.serialize();

    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: data,
    })
      .then((res) => {
        $(".error-message").slideUp().addClass("hidden");
        $("#tweets-container article").remove();
        $(".counter").val(140);
        loadTweets();
        $form[0][0].value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
