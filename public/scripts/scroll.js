$(document).ready(() => {
  $(document).scroll(onScroll);
  $('#scroll-btn').on("click", toTop)
})

//function to make btn appear past the header of the document
const onScroll = () => {
  if ($(document).scrollTop() > 400) {
    $("#scroll-btn").fadeIn();
  } else {
    $("#scroll-btn").hide();
  }
};

//when called- returns the document to top of page
const toTop = () => {
  $(document).scrollTop(0);
}