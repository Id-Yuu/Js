const myCaches = "MyCache_2";
const assets = [
  "https://arlethdesign.blogspot.com",
  "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
  "https://rawcdn.githack.com/Id-Yuu/Css/58b0a43c60065ab308d18d52a259d0e340081199/styles.css",
  "https://www.blogger.com/dyn-css/authorization.css",
  "https://arlethdesign.blogspot.com/favicon.ico",
  "https://www.blogger.com/static/v1/widgets/315554011-widgets.js",
  "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/fonts/fontawesome-webfont.woff2?v=4.4.0"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(myCaches).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
