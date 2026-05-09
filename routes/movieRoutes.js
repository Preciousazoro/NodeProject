const express = require("express");
const router = express.Router();

router.get("/movies", async (req, res) => {
  const search = req.query.search || "Avengers";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=${process.env.OMDB_API_KEY}`
    );

    const data = await response.json();

    if (data.Response === "False") {
      return res.json([]);
    }

    res.json(data.Search.slice(0, 4));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

module.exports = router;