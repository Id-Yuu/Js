# Card Hover Html & Javascript

1. HTML
   ```
   <div class="page-content">
      <div class="card-half-list">
        <div class="card-container">
          <div class="card-outer card-control">
            <a href="#">
              <div class="card-bg"></div>
              <div class="card-img-area">
                <div class="card-dots"></div>
              </div>
              <div class="card-img-area" style="overflow: inherit">
                <div class="card-img">
                  <img
                    class="lazyload"
                    src="https://images.unsplash.com/photo-1627467658687-4accff8724a5"
                    width="120px"
                  />
                </div>
              </div>
              <div class="card-logo-area">
                <div class="card-logo">
                  <div class="logo-epoque">
                    <img
                      src="https://react.dev/_next/image?url=%2Fimages%2Fuwu.png&w=384&q=75"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
              <div class="card-tag" style="display: none"></div>
              <div class="card-tag-bg" style="display: none"></div>
              <div class="card-title">Js</div>
              <div class="card-subtitle">CardHover</div>
            </a>
          </div>
        </div>
      </div>
    </div>
   ```
   
3. CSS
   ```
   :root {
    --size1: 10px;
    --size2: 5px;
    --color1: rgba(0, 0, 0, 0.2);
   }
   .card-list {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
   }
   .page-content {
    position: relative;
    margin-top: 20px;
    overflow: inherit;
    transition: all 0.3s ease-in-out;
   }
   .card-half-list {
    width: 100%;
    transition: all 0.3s ease-in-out;
    vertical-align: top;
    display: block;
   }
   .card-container {
    width: 120px;
    height: 276px;
    display: inline-block;
    margin: 8px;
    font-size: 0px;
    vertical-align: top;
   }
   .card-outer {
    width: 120px;
    height: 276px;
    background-color: white;
    position: relative;
    margin: 0px;
    font-size: 0px;
    display: inline-block;
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.5));
    cursor: pointer;
   }
   .card-bg {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: white;
    width: 120px;
    height: 240px;
    z-index: 0;
   }
   .card-img-area {
    position: absolute;
    bottom: 36px;
    left: 0px;
    width: 120px;
    z-index: 1;
    overflow: hidden;
   }
   .card-img {
    position: relative;
    z-index: 1;
   }
   .card-dots {
    position: absolute;
    right: -50px;
    bottom: -33px;
    width: 200px;
    height: 100px;
    background-image: radial-gradient(var(--color1) 6%, transparent 7%),
      radial-gradient(var(--color1) 12%, transparent 13%),
      radial-gradient(var(--color1) 16%, transparent 17%),
      radial-gradient(var(--color1) 20%, transparent 21%),
      radial-gradient(var(--color1) 25%, transparent 26%),
      radial-gradient(var(--color1) 26%, transparent 27%),
      radial-gradient(var(--color1) 30%, transparent 31%),
      radial-gradient(var(--color1) 32%, transparent 33%),
      radial-gradient(var(--color1) 35%, transparent 36%),
      radial-gradient(var(--color1) 32%, transparent 33%),
      radial-gradient(var(--color1) 35%, transparent 36%),
      radial-gradient(var(--color1) 32%, transparent 33%),
      radial-gradient(var(--color1) 35%, transparent 36%),
      radial-gradient(var(--color1) 32%, transparent 33%),
      radial-gradient(var(--color1) 35%, transparent 36%),
      radial-gradient(var(--color1) 32%, transparent 33%);
    background-size: var(--size1) var(--size1);
    background-position: 0 0, var(--size2) 5px, 0 10px, var(--size2) 15px,
      0 20px, var(--size2) 25px, 0 30px, var(--size2) 35px, 0 40px,
      var(--size2) 45px, 0 50px, var(--size2) 55px, 0 60px,
      var(--size2) 65px, 0 70px, var(--size2) 75px, 0 80px,
      var(--size2) 85px, 0 90px, var(--size2) 95px, 0 100px,
      var(--size2) 105px;
    background-repeat: repeat-x;
    transform: rotate(-15deg);
    z-index: 0;
   }
   .card-logo-area {
    position: absolute;
    top: 0px;
    width: 120px;
    height: 240px;
    overflow: hidden;
    z-index: 0;
    transition: all 0.4s ease;
    transform-origin: left top;
   }
   .card-logo {
    filter: invert();
    opacity: 0.81;
    position: relative;
   }
   .logo-hover {
    position: absolute;
    top: 50px;
    left: -10px;
    width: 120px;
   }
   .card-tag {
    width: 66px;
    height: 20px;
    background-color: #0224ff;
    position: absolute;
    top: 5px;
    right: -7px;
    color: white;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    box-sizing: border-box;
    z-index: 2;
   }
   .card-tag-bg {
    width: 30px;
    height: 20px;
    position: absolute;
    top: 5px;
    right: -7px;
    transform-origin: bottom right;
    transform: rotate(-45deg);
    background-color: #1f1f8a;
    z-index: -1;
   }
   .card-title {
    position: absolute;
    top: 244px;
    left: 4px;
    color: #5b5b5b;
    font-weight: bold;
    font-size: 13px;
    line-height: 12px;
   }
   .card-subtitle {
    position: absolute;
    bottom: 4px;
    left: 4px;
    color: #5b5b5b;
    font-size: 10px;
    line-height: 12px;
   }
   ```
  
3. JS
   ```
   document.addEventListener("DOMContentLoaded", function () {
        const cards = document.querySelectorAll(".card-outer");

        cards.forEach((card) => {
          let rect = card.getBoundingClientRect();
          let centerX = rect.left + rect.width / 2;
          let centerY = rect.top + rect.height / 2;
          const threshold = 20;

          window.addEventListener("resize", () => {
            rect = card.getBoundingClientRect();
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
          });

          function rotate(cursorPosition, centerPosition, threshold = 20) {
            if (cursorPosition - centerPosition >= 0) {
              return cursorPosition - centerPosition >= threshold
                ? threshold
                : cursorPosition - centerPosition;
            } else {
              return cursorPosition - centerPosition <= -threshold
                ? -threshold
                : cursorPosition - centerPosition;
            }
          }

          function brightness(cursorPositionY, centerPositionY, strength = 20) {
            return (
              1 - (rotate(cursorPositionY, centerPositionY) / strength) * 0.05
            );
          }

          const container = card.closest(".card-container");
          const logo = card.querySelector(".card-logo-area");
          const logoInner = card.querySelector(".card-logo");
          const charImg = card.querySelector(".card-img");

          container.addEventListener("mouseover", () => {
            container.classList.remove("card-ani-out");
            container.classList.add("card-ani-in");
            container.style.zIndex = "1";

            if (logo) {
              logo.style.overflow = "inherit";
              logo.style.left = "-20px";
              logo.style.top = "-30px";
              logo.style.transform = "scale(0.7)";
            }

            setTimeout(() => {
              container.style.transition = "all 0s ease";
            }, 300);
          });

          card.addEventListener("mousemove", (event) => {
            let calcX = rotate(event.x, centerX);
            let calcY = rotate(event.y, centerY);
            let calcX2 = event.x - centerX;
            let calcY2 = event.y - centerY;

            card.style.transform = `translateZ(0) perspective(1000px) rotateY(${calcX}deg) rotateX(${
              -calcY / 1.5
            }deg)`;

            if (logoInner) {
              logoInner.style.left = `${calcX2 / 10}px`;
              logoInner.style.top = `${calcY2 / 15}px`;
            }

            if (logo) {
              logo.style.filter = `drop-shadow(${-calcX / 7}px ${
                -calcY / 7
              }px 0px white)`;
            }

            if (charImg) {
              charImg.style.left = `${calcX2 / 8}px`;
              charImg.style.top = `${calcY2 / 13}px`;
              charImg.style.filter = `drop-shadow(${-calcX / 2}px ${
                -calcY / 2
              }px 5px rgba(0, 0, 20, 0.2))`;
            }

            card.style.filter = `brightness(${brightness(event.y, centerY)})`;
            card.style.boxShadow = `${-calcX}px ${-calcY}px 10px 0px rgba(0, 0, 20, 0.25)`;
          });

          container.addEventListener("mouseleave", () => {
            container.classList.remove("card-ani-in");
            container.classList.add("card-ani-out");
            container.style.zIndex = "0";
            container.style.transition = "all .4s ease";

            card.style.transform = "perspective(500px) scale(1)";
            card.style.filter =
              "brightness(1) drop-shadow(0px 5px 5px rgba(0,0,0,.5))";
            card.style.boxShadow = "0 0 0 0 rgba(0, 0, 0, 0.2)";

            if (charImg) {
              charImg.style.left = "0";
              charImg.style.top = "0";
              charImg.style.filter = "none";
            }

            if (logo) {
              logo.style.left = "0";
              logo.style.top = "0";
              logo.style.filter = "none";
              logo.style.transform = "translateZ(0) scale(1)";
              logo.style.overflow = "hidden";
            }

            if (logoInner) {
              logoInner.style.left = "0";
              logoInner.style.top = "0";
            }
          });
        });
      });
   ```
