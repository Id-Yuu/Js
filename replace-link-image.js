$(document).ready(function () {
  $(".popular-posts img").attr("src", function (i, src) {
    return src.replace("s72-c", "s640");
  });
});
