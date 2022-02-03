$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    let remainingChar = 140 - $(this).val().length;
    let $output = $(this).siblings('div').children('output');
    let $tweetButton = $(this).siblings('div').children('button');
    let $label = $(this).next();
    $output.html(remainingChar);
    $(this).val() ? $label.addClass('deactivate-display') : $label.removeClass('deactivate-display');
    if (remainingChar < 0) {
      $output.addClass('danger-text');
      $tweetButton.addClass('deactivate-btn');
    } else {
      $output.removeClass('danger-text');
      $tweetButton.removeClass('deactivate-btn');
    }
  })
});