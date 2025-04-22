const functions = require("firebase-functions");
const axios = require("axios");

const WORDS_API_KEY = "AIzaSyDm97pANqECIOfJwL0NVH7SZ7yXKi4IffUE"; 

exports.getFancyWord = functions.https.onRequest(async (req, res) => {
  try {
    const response = await axios.get("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
      headers: {
        "X-RapidAPI-Key": WORDS_API_KEY,
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
      }
    });

    const word = response.data.word;
    const definition = response.data.results?.[0]?.definition || "Ei löytynyt merkitystä";

    res.json({ word, definition });
  } catch (error) {
    console.error("Virhe:", error);
    res.status(500).send("Virhe sanan haussa");
  }
});
