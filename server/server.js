const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 8080;

const flickrApiKey = process.env.FLICKR_API_KEY;
const flickrBaseUrl = "https://www.flickr.com/services/rest/";
const defaultParams = {
  api_key: flickrApiKey,
  format: "json",
  nojsoncallback: 1,
};

const flickr = axios.create({
  baseURL: flickrBaseUrl,
  params: defaultParams,
});

app.get("/getPhotos", async (req, res) => {
  const query = req.query.query;
  const perPage = req.query.perPage || 10;

  const userAgent = req.headers["user-agent"] || "Mozilla/5.0";

  try {
    const response = await flickr.get("/?method=flickr.photos.search", {
      params: {
        text: query,
        per_page: perPage,
      },
      headers: {
        "User-Agent": userAgent,
      },
    });

    const data = response.data;
    const images = data.photos.photo.map((photo) => ({
      id: photo.id,
      title: photo.title,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
    }));

    res.json({
      images,
      total: data.photos.total,
      pages: data.photos.pages,
    });
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).send("Error accessing Flickr API");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
