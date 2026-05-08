// routes/weatherRoute.js
const express = require("express");
const router = express.Router();

router.get("/weather", async (req, res) => {
  const city = req.query.city || "Lagos";
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    res.json({ current, forecast });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch weather" });
  }
});

module.exports = router;













// const express = require("express");
// const router = express.Router();

// router.get("/weather", async (req, res) => {
//   const city = req.query.city || "Lagos";

//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${process.env.WEATHER_API_KEY}`
//     );

//     const data = await response.json();

//     if (data.cod !== "200") {
//       return res.status(404).json({
//         error: data.message || "City not found",
//       });
//     }

//     const forecast = data.list.slice(0, 8).map(item => ({
//       time: item.dt_txt,
//       temp: item.main.temp,
//       humidity: item.main.humidity,
//       description: item.weather[0].description,
//       icon: item.weather[0].icon,
//       wind: item.wind.speed,
//     }));

//     res.json({
//       city: data.city.name,
//       country: data.city.country,
//       forecast,
//     });

//   } catch (error) {
//     console.log("Weather API error:", error);
//     res.status(500).json({ error: "Failed to fetch weather" });
//   }
// });

// module.exports = router;