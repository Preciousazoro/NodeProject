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
async function loadWeather(city = "Lagos") {
  const res = await fetch(`/api/weather?city=${city}`);
  const data = await res.json();

  const current = data.current;

  document.getElementById("cityName").textContent =
    `Forecast in ${current.name}, ${current.sys.country}`;

  document.getElementById("temperature").textContent =
    `${Math.round(current.main.temp)}°C`;

  document.getElementById("condition").textContent =
    current.weather[0].description;

  document.getElementById("highLow").textContent =
    `High ${Math.round(current.main.temp_max)}°C / Low ${Math.round(current.main.temp_min)}°C`;

  document.getElementById("visibility").textContent =
    `${current.visibility / 1000}km`;

  document.getElementById("humidity").textContent =
    `${current.main.humidity}%`;

  document.getElementById("wind").textContent =
    `${current.wind.speed} m/s`;

  document.getElementById("sunrise").textContent =
    new Date(current.sys.sunrise * 1000).toLocaleTimeString();

  document.getElementById("sunset").textContent =
    new Date(current.sys.sunset * 1000).toLocaleTimeString();

  const forecastContainer = document.getElementById("forecastCards");
  forecastContainer.innerHTML = "";

  const daily = data.forecast.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  daily.forEach(day => {
    forecastContainer.innerHTML += `
      <div class="forecast-card">
        <h4>${new Date(day.dt * 1000).toLocaleDateString("en", { weekday: "short" })}</h4>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" width="60" />
        <h3>${Math.round(day.main.temp)}°C</h3>
        <p>${day.weather[0].description}</p>
      </div>
    `;
  });
}

document.getElementById("weatherForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const city = document.getElementById("cityInput").value;
  loadWeather(city);
});

  loadWeather();
  loadNews();




  // MOVIE
  async function searchMovie(query = "Avengers") {
    const container = document.getElementById("movieContainer");

    try {
      const response = await fetch(`/api/movies?search=${encodeURIComponent(query)}`);
      const movies = await response.json();

      if (!movies.length) {
        container.innerHTML = "<p>No movies found.</p>";
        return;
      }

      container.innerHTML = movies.map(movie => `
        <div class="movie-card">
          <img 
            src="${movie.Poster !== "N/A" ? movie.Poster : "/images/no-poster.png"}" 
            alt="${movie.Title}" 
          />

          <div class="movie-info">
            <h3>${movie.Title}</h3>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Type:</strong> ${movie.Type}</p>
          </div>
        </div>
      `).join("");

    } catch (error) {
      container.innerHTML = "<p>Failed to load movies.</p>";
      console.error(error);
    }
  }

  document.getElementById("movieSearch").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchMovie(this.value);
    }
  });

  searchMovie();

