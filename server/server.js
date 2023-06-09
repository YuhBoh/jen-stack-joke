const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

console.log("server working");
// use bodyParser.urlencoded throughout the app with this:
app.use(bodyParser.urlencoded({ extended: true }));

let jokes = [
  {
    whoseJoke: "Danny",
    jokeQuestion: "Why do scuba divers fall backwards out of boats?",
    punchLine: "If they fell forwards they’d still be in the boat!",
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Two fish are in a tank. What did one fish say to the other?",
    punchLine: "Do you know how to drive this thing?",
  },
  {
    whoseJoke: "Millie",
    jokeQuestion: "What do you call a pile of cats?",
    punchLine: "A meowntain!",
  },
  {
    whoseJoke: "Dev",
    jokeQuestion: "Why should you not play cards in the forest?",
    punchLine: "Too many Cheetahs!",
  },
  {
    whoseJoke: "Scott",
    jokeQuestion: "I went to the zoo the other day, it had one dog...",
    punchLine: "It was a shih tzu.",
  },
];

// console.log(jokes); It's working

// serve back static files
app.use(express.static("server/public"));

//APP.GET
app.get("/joke", (req, res) => {
  res.send(jokes);
});

// APP.POST
app.post("/joke", (req, res) => {
  let postedJokeObject = req.body;
  console.log("test input into body");
  let whoseJokeIn = postedJokeObject.whoseJoke;
  let questionIn = postedJokeObject.jokeQuestion;
  let punchlineIn = postedJokeObject.punchLine;

  jokes.unshift({
    whoseJoke: whoseJokeIn,
    jokeQuestion: questionIn,
    punchLine: punchlineIn,
  });

  let allObject = {
    whoseJoke: whoseJokeIn,
    jokeQuestion: questionIn,
    punchLine: punchlineIn,
  };

  res.send(allObject);
});

app.listen(PORT, () => {
  console.log("server running on: ", PORT);
}); // end spin up server
