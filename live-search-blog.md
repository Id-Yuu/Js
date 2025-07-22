Result Output
```
<div id="results-search"></div>
```

Form
```
  <form action="https://arlethdesign.blogspot.com/search" class="gsc-search-box" target="_top">
    <table cellpadding="0" cellspacing="0" class="gsc-search-box">
      <tbody>
        <tr>
          <td class="gsc-input">
            <input autocomplete="off" class="gsc-input" name="q" size="10" title="search" type="text" value="">
          </td>
          <td class="gsc-search-button">
            <input class="gsc-search-button" title="search" type="submit" value="Search">
          </td>
        </tr>
      </tbody>
    </table>
  </form>
```

Script
```
<script type='text/javascript'>
  window.onload = function () {
    const searchInput = document.querySelector('form.gsc-search-box table input.gsc-input');
    const resultsDiv = document.getElementById('results-search');

    // Create global callback for JSONP
    window.handleFeedData = function (json) {
      const query = searchInput.value.trim().toLowerCase();
      const entries = json.feed?.entry || [];

      const titles = entries
        .map(entry => {
          const title = entry.title?.$t;
          const link = (entry.link || []).find(l => l.rel === 'alternate')?.href;
          return title && link && title.toLowerCase().includes(query)
            ? { title, link }
            : null;
        })
        .filter(Boolean);

      displayResults(titles);
    };


    // Inject JSONP script with callback
    function fetchJSONP() {
      // Remove previous scripts to avoid duplication
      const existing = document.getElementById('jsonpFeed');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.id = 'jsonpFeed';
      script.src =
        'https://www.blogger.com/feeds/7653922705179393945/posts/default?alt=json-in-script&callback=handleFeedData';
      document.body.appendChild(script);
    }

    function displayResults(titles) {
      resultsDiv.innerHTML = '';
      if (titles.length === 0) {
        resultsDiv.innerHTML = '<p>No results found</p>';
        return;
      }

      titles.forEach(item => {
        const div = document.createElement('div');
        div.className = 'result-item';

        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.title;
        a.target = '_blank'; // opens in new tab

        div.appendChild(a);
        resultsDiv.appendChild(div);
      });
    }


    // Live search: fetch JSONP on each input
    searchInput.addEventListener('input', function () {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        fetchJSONP(); // trigger JSONP fetch
      } else {
        resultsDiv.innerHTML = '';
      }
    });
  };
</script>
```
