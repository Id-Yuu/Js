/* 
	Disable Devtool
	https://arlethdesign.blogspot.com/2019/01/disable-inspect-element-terbaru.html
 */
var url = 'https://YOUR_LINK.com/'

document.onmousedown = disableclick;
function disableclick(event) {
 if (event.button == 2) {
  window.open(url,'_self');
  return false;
 }
};
document.onkeydown = function (e) {
 if (event.keyCode == 123) {
  window.open(url,'_self');
  return false;
 }
 if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
  window.open(url,'_self');
  return false;
 }
 if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
  window.open(url,'_self');
  return false;
 }
 if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
  window.open(url,'_self');
  return false;
 }
};
 