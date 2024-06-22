const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Enable CORS for all routes

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

// Route to get images from Flickr API
app.get("/getImages", async (req, res) => {
  const query = req.query.query; // Get search query from request parameters
  const perPage = req.query.perPage || 24; // Get number of images per page, default to 24
  const page = req.query.page || 1; // Get current page number, default to 1

  const userAgent = req.headers["user-agent"] || "Mozilla/5.0"; // Get User-Agent header to avoid an API call error

  try {
    // Make request to Flickr API to get images with the desired query
    const response = await flickr.get("/?method=flickr.photos.search", {
      params: {
        text: query,
        per_page: perPage,
        page,
      },
      headers: {
        "User-Agent": userAgent,
      },
    });

    const data = response.data;

    // Map API response to desired format
    const images = data.photos.photo.map((photo) => ({
      id: photo.id,
      title: photo.title,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
      originalUrl: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
    }));

    // Send response with image data and other information
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
