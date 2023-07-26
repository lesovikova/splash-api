const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8090;

app.get("/", (req, res) => {
    res.status(200).json("you've reached the root")
})

async function getPhotos(result, subject) {
    const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query=${subject}`
    const res = await axios.get(API);
    const photos = res.data.results.map((photo)=>{ 
    return {
        id: photo.id,
        img_url: photo.urls.regular,
        original_image: photo.links.self,
        photographer: photo.user.name,
}})
    result.json(photos)
    
}

app.get("/photos", (req, res) => {
    const subject = req.query.subject;
    getPhotos(res, subject);
})

app.listen(PORT, () => console.log("We are listening"))

// https://api.unsplash.com/search/photos/?client_id=YOUR_ACCESS_KEY