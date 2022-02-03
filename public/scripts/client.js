// Template post for new tweets
const createTweetElement = function (data) {
  return $(`<article class="tweet-post">
  <header>
    <figure class="tweet-name">
    <img src="${data.user.avatars}" alt=""></i>${data.user.name}</figure>
    <a class="tweet-handle">${data.user.handle}</a>
    
  </header>
  <p class="tweet">${escapeText(data.content.text)}</p>
  <footer class="post-footer">
    <p class="tweet-timelapsed">${timeago.format(data.created_at)}</p>
    <figure>
      <a href="#"><i class="far fa-flag"></i></a>
      <a href="#"><i class="fas fa-retweet"></i></a>
      <a href="#"><i class="fas fa-heart"></i></a>  
    </figure>
  </footer>
</article>`);
};

//Function that loops through array of tweets and prepends to the tweets container
const renderTweets = function (dataArray) {
  const container = $(".tweets-container");
  container.empty();

  dataArray.forEach((element) => {
    const tweet = createTweetElement(element);
    container.prepend(tweet);
  });
};

// when document ready- load database of tweets and listen for submission of new tweets
$(document).ready(() => {
  loadTweets();
  $("form").get(0).reset();
  $(document).on("submit", onSubmit);
  $("#toTweet").on('click', ()=>{
    $('.new-tweet').slideDown();
  })
});

//ajax request to get database of tweets and render thems
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
  }).done(function (data) {
    renderTweets(data);
  });
};

//function to for when tweet form is submitted
const onSubmit = function (event) {
  event.preventDefault();
  const content = $(event.target.text).val();

  //validation for when post has not chars
  if (!content) {
    const error =$('#tweet-error');
    error.html("The post cannot be blank!") ;
    error.slideDown().delay(2000).slideUp(1000);
    return;
  }
  //validation for when post exceeds 140 chars
  if (content.length > 140) {
    const error =$('#tweet-error');
    error.html("Exceeded the 140 character limit!") ;
    error.slideDown().delay(2000).slideUp(1000);
    return;
  }

  let post = $(event.target).serialize();
  $.post("/tweets", post).done(() => {
    $("form").get(0).reset();
    $('output.counter').html("140");
    loadTweets();
  });
}

//function for escaping the text to prevent cross site scripting
const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  const text = div.innerHTML;
  return text;
};

