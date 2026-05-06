const express = require("express");

const router = express.Router();

router.get("/weather", async (req, res) => {
  const city = req.query.city || "Lagos";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.json({ error: "Weather not found" });
  }
});

module.exports = router;