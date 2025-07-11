
# Slider Carousel with Hover Detail

1. CDN
   ```
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   <link
      href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
      rel="stylesheet"
    />
   <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
   ```

2. Script.js
   ```
   class BloggerCard extends HTMLElement {
   constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.renderSkeleton();
   }
   set data(entry) {
    const title = entry.title?.$t || "Untitled";
    const link = entry.link.find((l) => l.rel === "alternate")?.href || "#";
    const img =
      (entry.media$thumbnail?.url || "").replace(/s72-c/, "s1600") + "-rw";
    const updated = new Date(entry.updated?.$t).toLocaleDateString();
    const summary = entry.summary?.$t || "No summary available.";
    const categories = entry.category?.map((cat) => cat.term);
    const allowedGenres = [
      "Action",
      "Adult Cast",
      "Adventure",
      "Anthropomorphic",
      "Autobiografi",
      "Avant Garde",
      "CGDCT",
      "Childcare",
      "Comedy",
      "Crossdressing",
      "Delinquents",
      "Demons",
      "Detective",
      "Dokumenter",
      "Drama",
      "Ecchi",
      "Emotional Damage",
      "Erotica",
      "Fantasy",
      "Furry",
      "Gag Humor",
      "Game",
      "Girls Love",
      "Gore",
      "Gourmet",
      "Harem",
      "Hentai",
      "Historical",
      "Horror",
      "Idols (Female)",
      "Isekai",
      "Josei",
      "Love Polygon",
      "Hentai",
      "Magic",
      "Magical Sex Shift",
      "Mahou Shoujo",
      "Martial Arts",
      "Mecha",
      "Medical",
      "Military",
      "Music",
      "Mystery",
      "Mythology",
      "Organized Crime",
      "Otaku Culture",
      "Parody",
      "Performing Arts",
      "Post-Apocalyptic",
      "Psychological",
      "Racing",
      "Reincarnation",
      "Religi",
      "Reverse Harem",
      "Romance",
      "Romantic Subtext",
      "Samurai",
      "School",
      "Sci-Fi",
      "Seinen",
      "Shoujo",
      "Shounen",
      "Showbiz",
      "Slice of Life",
      "Space",
      "Sports",
      "Strategy Game",
      "Super Power",
      "Supernatural",
      "Survival",
      "Suspense",
      "Team Sports",
      "Thriller",
      "Time Travel",
      "Urban Fantasy",
      "Vampire",
      "Video Game",
      "Villainess",
      "Workplace",
    ];
    const statusGenre = ["Ongoing", "Completed"];
    const typeAnime = ["TV", "Movie", "OVA", "ONA", "Special"];
    const filteredGenres = categories.filter((cat) =>
      allowedGenres.includes(cat)
    );
    const statusGenres = categories.filter((cat) => statusGenre.includes(cat));
    const animeType = categories.filter((cat) => typeAnime.includes(cat));

    setTimeout(() => {
      this.shadowRoot.innerHTML = `
          <style>
            .card {
              overflow: hidden;
              font-family: sans-serif;
              position: relative;
              margin: 5px;
              cursor: pointer;
            }
            img {
              width: 100%;
              height: 100%;
              aspect-ratio: 2 / 3; /* Portrait ratio */
              object-fit: cover;
              display: block;
            }
            .card a{
              text-decoration: none;
            }
            .card h4 {
              font-size: 14px;
              margin: 10px 0 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* Specify the number of lines */
              -webkit-box-orient: vertical;
            }
          </style>
          <div class="card">
  	        <a href="${link}" target="_self">
      	      <img src="${img}" alt="${title}" loading="lazy">
                <h4>${title}</h4>
  			    </a>
          </div>
        `;

      const card = this.shadowRoot.querySelector(".card");

      // Create subcard outside the shadow DOM
      const subcard = document.createElement("div");
      subcard.className = "subcard";
      subcard.innerHTML = `
          <div class="content-subcard">
            <div class="left">
              <img src="${img}" alt="${title}" loading="lazy" style="min-width:150px;">
            </div>
            <div class="right">
              <h3>${title}</h3>
              <table class="meta-table">
              <tr>
                <th>Updated</th>
                <td>${updated}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>${animeType.join(", ")}</td>
              </tr>
              <tr>
                <th>Genres</th>
                <td>${filteredGenres.join(", ")}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>${statusGenres.join(", ")}</td>
              </tr>
              <tr>
                <th>Summary</th>
                <td>${summary}</td>
              </tr>
            </table>
            </div>
          </div>
        `;
      document.body.appendChild(subcard);

      // disable subcard on responsive devices realtime read window width responsive
      const mediaQuery = window.matchMedia("(max-width: 600px)");
      if (mediaQuery.matches || window.innerWidth < 600) {
        subcard.style.display = "none";
        subcard.remove();
      }

      // disable subcard on touch devices
      if ("ontouchstart" in document.documentElement) {
        subcard.remove();
      }

      // Style the subcard globally
      const style = document.createElement("style");
      style.textContent = `
          .subcard {
            position: fixed;
            pointer-events: none;
            background: rgba(0,0,0,0.85);
            padding: 10px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            border-radius: 6px;
            max-width: 350px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
            transition: opacity 0.2s ease, transform 0.2s ease;
            z-index: 99999;
          }
          .subcard.visible {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          .content-subcard {
            display: flex;
            align-items: flex-start;
            gap:10px;
            color: #ddd;
          }
          .content-subcard .left{width:150px;}
          .content-subcard .right{overflow: hidden;}
          .content-subcard .left img {
            width: 150px;
            aspect-ratio: 2 / 3; /* Portrait ratio */
            object-fit: cover;
            border-radius: 4px;
            display: block;
          }
          .content-subcard h3 {
			      font-size:14px;
            font-family: sans-serif;
            font-weight: bold;
            color: #fff;
            margin: 2px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* Specify the number of lines */
            -webkit-box-orient: vertical;
          }
          .meta-table {
            width: 100%;
            border-collapse: collapse;
            font-family: sans-serif;
            margin-top: 10px;
            font-size:11px;
            border-spacing: 0;
          }
          .meta-table th {
            text-align: left;
            padding: 6px;
            font-weight:bold;
            width: 65px;
            display: table-cell;
            vertical-align: inherit;
            font-weight: bold;
            text-align: -internal-center;
            unicode-bidi: isolate;
          }
          .meta-table tr:nth-child(odd) {
            background-color: rgba(0,0,0,0.2);
          }
          .meta-table tr {
          	border-bottom: 1px solid rgba(255,255,255,0.2);
            vertical-align: baseline;
            margin: 0;
            padding: 0;
          }
          .meta-table td {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* Specify the number of lines */
            -webkit-box-orient: vertical;
            margin-bottom: 5px;
          }
          // Responsive styles hide subcard on small screens
          @media (max-width: 600px) {
            .subcard {
              display: none;
            }
          }
        `;
      document.head.appendChild(style);

      card.addEventListener("mousemove", (e) => {
        const subcardWidth = subcard.offsetWidth || 350;
        const subcardHeight = subcard.offsetHeight || 200;
        const padding = 10; // Optional: add some space from the edge

        let left = e.clientX;
        let top = e.clientY;

        // Adjust left if subcard would overflow right edge
        if (left + subcardWidth / 2 + padding > window.innerWidth) {
          left = window.innerWidth - subcardWidth / 2 - padding;
        }
        // Adjust left if subcard would overflow left edge
        if (left - subcardWidth / 2 - padding < 0) {
          left = subcardWidth / 2 + padding;
        }
        // Adjust top if subcard would overflow bottom edge
        if (top + subcardHeight / 2 + padding > window.innerHeight) {
          top = window.innerHeight - subcardHeight / 2 - padding;
        }
        // Adjust top if subcard would overflow top edge
        if (top - subcardHeight / 2 - padding < 0) {
          top = subcardHeight / 2 + padding;
        }

        subcard.style.left = `${left}px`;
        subcard.style.top = `${top}px`;
        subcard.style.width = "350px";
        subcard.classList.add("visible");
        subcard.style.transform = "translate(-50%, -50%) scale(1)";
      });

      card.addEventListener("mouseleave", () => {
        subcard.classList.remove("visible");
      });
    }, 2000);
    }
    renderSkeleton() {
    this.shadowRoot.innerHTML = `
        <style>
          .skeleton {
            width: 100%;
            aspect-ratio: 2 / 3;
            border-radius: 8px;
            background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            margin: 5px 0;
            display: block;
            height: auto;
            min-height: 150px;
            max-width: 350px;
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @media (max-width: 600px) {
            .skeleton {
              width: 100%;
              min-height: 100px;
            }
          }
          @media (max-width: 1000px) {
            .skeleton {
              min-height: 120px;
            }
          }
        </style>
        <div class="skeleton"></div>
	`;
 	}
   }
   customElements.define("slide-card", BloggerCard);
   ```

4. Create Script Show Data Blogger
   ```
   <script type="text/javascript">
    function handleFeed(data) {
      const container = $("#blog-carousel");
      const entries = data.feed?.entry || [];
      if (entries.length === 0) {
        document.getElementById("empty-message").style.display = "block";
        return;
      } else {
        document.getElementById("empty-message").style.display = "none";
      }
      entries.forEach((entry) => {
        const card = document.createElement("slide-card");
        card.data = entry;
        container.append(card);
      });
      // Wait for cards to render, then initialize OwlCarousel
      setTimeout(() => {
        container.owlCarousel({
          items: 5,
          margin: 5,
          autoplay: true,
          loop: true,
          autoplayHoverPause: true,
          nav: true,
          dots: false,
          responsive: {
            0: { items: 2 },
            480: { items: 3 },
            576: { items: 4 },
            768: { items: 4 },
            1000: { items: 5 },
          },
        });
      }, 1000); // Wait for skeletons to finish
    }

    // Dynamically load Blogger feed as JSONP
    // XXXX = ID Blogger
    (function () {
      const script = document.createElement("script");
      script.src = "https://www.blogger.com/feeds/XXXXXXXXXXXXX/posts/default?alt=json-in-script&callback=handleFeed";
      document.body.appendChild(script);
    })();
   </script>
   ```

6. Create Style
   ```
   .empty-message {display: none;}
   #blog-carousel{position:relative}
   #blog-carousel .owl-prev span{position:absolute;top:41%;left:0;background:rgb(0 0 0 / 80%);color:#fff;border:0;font-size:24px;cursor:pointer;z-index:1;padding:5px 10px}
   #blog-carousel .owl-next span{position:absolute;top:41%;right:0;background:rgb(0 0 0 / 80%);color:#fff;border:0;font-size:24px;cursor:pointer;z-index:1;padding:5px 10px}
   ```

8. Result to show data
   ```
   <div class="owl-carousel" id="blog-carousel"></div>
   <div id="empty-message" class="empty-message">No blog posts found.</div>
   ```
