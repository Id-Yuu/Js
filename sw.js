self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("css-store")
      .then((cache) =>
        cache.addAll([
          "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
          "https://rawcdn.githack.com/Id-Yuu/Css/15a27deda31c951821e567487a4489c90507a61d/styles.css",
        ]),
      ),
  );
});

self.addEventListener('fetch', e => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
