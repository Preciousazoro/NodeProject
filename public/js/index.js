  // NEWS
  const newsBox = document.getElementById("newsContainer");

  const getImage = article =>
    article?.og?.image || article?.og || "/images/no-image.png";

  const flattenNews = data =>
    Array.isArray(data) ? data : Object.values(data || {}).flat();

  async function loadNews() {
    newsBox.innerHTML = "<p>Loading news...</p>";

    try {
      const res = await fetch("/api/news");
      const articles = flattenNews(await res.json()).slice(0, 12);

      if (!articles.length) {
        newsBox.innerHTML = "<p>No news found.</p>";
        return;
      }

      newsBox.innerHTML = articles.map(article => `
        <div class="card">
          <img 
            src="${getImage(article)}" 
            alt="News image" 
            class="news-img"
            onerror="this.src='/images/no-image.png'"
          >

          <div class="news-source">
            ${article.source_icon ? `<img src="${article.source_icon}" class="source-icon">` : ""}
            <span>${article.source || "Unknown source"}</span>
          </div>

          <h3>${article.title || "Untitled News"}</h3>
          <p>${article.description || article.snippet || "Click below to read full story."}</p>

          <a href="${article.link || "#"}" target="_blank" class="read-more">
            Read full news →
          </a>
        </div>
      `).join("");

    } catch (error) {
      console.error("News load error:", error);
      newsBox.innerHTML = "<p style='color:red;'>Failed to load news.</p>";
    }
  }

  // WEATHER
  async function loadWeather() {
    const city = document.getElementById("weatherSearch").value || "Lagos";
    const box = document.getElementById("weatherContainer");

    box.innerHTML = "<p>Loading weather...</p>";

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();

      if (data.error) {
        box.innerHTML = `<p>${data.error}</p>`;
        return;
      }

      box.innerHTML = `
        <h2>${data.city}, ${data.country}</h2>

        <div class="forecast-grid">
          ${(data.forecast || []).map(item => `
            <div class="forecast-card">
              <img src="https://openweathermap.org/img/wn/${item.icon}@2x.png">
              <h3>${item.temp}°C</h3>
              <p>${item.description}</p>
              <small>${new Date(item.time).toLocaleString()}</small>
              <p>💧 ${item.humidity}%</p>
              <p>💨 ${item.wind} km/h</p>
            </div>
          `).join("")}
        </div>
      `;

    } catch (error) {
      console.log(error);
      box.innerHTML = "<p>Failed to load weather.</p>";
    }
  }

  loadNews();
  loadWeather();
