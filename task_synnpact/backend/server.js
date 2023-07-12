const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to backend");
});

app.get("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(
      `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${id}`
    );

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(5000, () => {
  console.log(`server running on http://localhost:5000`);
});
