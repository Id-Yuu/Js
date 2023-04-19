/* 
    Use This HTML
    <img class='back-to-top' src='Link IMAGE'/> 

    source
    https://arlethdesign.blogspot.com/2017/09/cara-membuat-tombol-back-to-top-dengan.html
*/

jQuery(document).ready(function () {
  var t = 222,
    e = 495;
  jQuery(window).scroll(function () {
    // Call class
    jQuery(this).scrollTop() > t
      ? jQuery(".back-to-top").fadeIn(e)
      : jQuery(".back-to-top").fadeOut(e);
  }),
    jQuery(".back-to-top").click(function (t) {
      return (
        t.preventDefault(),
        jQuery("html, body").animate({ scrollTop: 0 }, e),
        !1
      );
    });
});
