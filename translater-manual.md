# Translater Blogger Manual

1. Script
   ```
   window.addEventListener("DOMContentLoaded", () => {
   // Find the JSON script tag
   const jsonScript = document.querySelector('script[type="text/json"]');
   if (!jsonScript) return;
   // Parse the JSON data
   let translations;
   try {
    translations = JSON.parse(jsonScript.textContent || "{}");
   } catch (e) {
    console.error("Invalid JSON in script tag:", e);
    return;
   }
   // Store original English text from HTML
   const original = {};
   document.querySelectorAll("[class^='t']").forEach((elem) => {
    const match = elem.className.match(/^t\d+$/);
    if (match) {
      original[elem.className] = elem.textContent || "";
    }
   });
   // Also store the title
   original.title = document.querySelector(".entry-title")?.textContent || "";
   // Function to update text
   function setText(lang) {
    const langData = translations[lang] || original;
    // Update title
    document.querySelector(".entry-title").textContent = langData.title || original.title;
    // Update all tN paragraphs
    document.querySelectorAll("[class^='t']").forEach((elem) => {
      const key = elem.className;
      if (langData[key]) {
        elem.textContent = langData[key];
      } else {
        elem.textContent = original[key];
      }
    });
   }
   // Initial load: show English (HTML)
   setText("English");
   // Add event listeners to buttons
   document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setText(btn.textContent.trim());
    });
   });
   });
   ```
   
3. Json script
   ```
   {
     "Indonesian": {
       "title": "Sample Document",
       "t1": "contoh paragraf dalam dokumen ini. Ini berfungsi sebagai contoh bagaimana konten dapat disusun dalam dokumen HTML.",
       "t2": "contoh konten tambahan dapat ditambahkan di sini.",
       "t3": "Silakan modifikasi templat ini.",
       "t4": "Ingatlah untuk menjaga konten Anda tetap menarik.",
       "t5": "Ini adalah paragraf contoh dalam dokumen ini. Ini berfungsi sebagai contoh bagaimana konten dapat disusun dalam dokumen HTML."
     }
   }
   ```
   
5. button trigger
   ```
   <div class="btn-translate">
     <button class="lang-btn">English</button>
     <button class="lang-btn">Indonesian</button>
   </div>
   ```
   
7. html
   ```
   <h1 class="entry-title">Title</h1>
   <p class="t1">
          This is a sample paragraph in the document. It serves as an example of
          how content can be structured within an HTML document.
   </p>
   <p class="t2">...</p>
   <p class="t3">...</p>
   <p class="t4">...</p>
   <p class="t5">...</p>
   ```
