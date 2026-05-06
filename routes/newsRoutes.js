const express = require("express");
const router = express.Router();

router.get("/news", async (req, res) => {
  try {
    const response = await fetch("https://ok.surf/api/v1/news-feed", {
      headers: { accept: "application/json" },
    });

    const data = await response.json();

    // OKSurf usually returns grouped news like:
    // { Business: [...], Technology: [...], Sports: [...] }
    let articles = [];

    if (Array.isArray(data)) {
      articles = data;
    } else if (typeof data === "object" && data !== null) {
      articles = Object.values(data).flat();
    }

    res.json(articles.slice(0, 20));
  } catch (error) {
    console.error("OKSurf news error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;






// const express = require("express");

// const router = express.Router();

// router.get("/news", async (req, res) => {
//   const search = req.query.search || "trending";

//   try {
//     const response = await fetch(
//       `https://newsapi.org/v2/everything?q=${search}&sortBy=publishedAt&pageSize=6&apiKey=${process.env.NEWS_API_KEY}`
//     );

//     const data = await response.json();

//     res.json(data.articles || []);
//   } catch (error) {
//     console.error(error);
//     res.json([]);
//   }
// });

// module.exports = router;