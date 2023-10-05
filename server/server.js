import { MongoClient } from "mongodb";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const moviesApi = express.Router();

const mongoDbUrl = process.env.MONGODB_URL;
const client = new MongoClient(mongoDbUrl);

client
  .connect()
  .then((connection) => {
    const database = connection.db("sample_mflix");

    moviesApi.get("", async (req, res) => {
      const movies = await database
        .collection("movies")
        .find({ year: 2013 })
        .limit(20)
        .toArray();
      res.json(movies);

      /*
    res.json([
        {title: "movie 1"},
        {title: "movie 2"},
    ]);
     */
    });
  })
  .catch((error) => {
    console.error("while connecting to mongoDB", error);
  });
const app = express();
app.use("/api/movies", moviesApi);
app.listen(process.env.PORT || 3000);