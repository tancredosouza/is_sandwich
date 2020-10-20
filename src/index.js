const express = require("express");
const monk = require("monk");
const cors = require("cors");

// Connection URL
const port = process.env.PORT || 5000;
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.501vn.mongodb.net/votes?retryWrites=true&w=majority`;
const db = monk(url);
db.then(() => console.log("Connected with server!"));

const collection = db.get("votes");
const FOOD_LIST = [
  "mistoquente",
  "sanduba",
  "hamburger",
  "pizza_dobrada",
  "paocomovo",
  "cachorroquente",
  "empanada",
  "tapioca",
  "Burrito",
  "Taco",
];

(async function createDatabase() {
  FOOD_LIST.forEach((food_id) => {
    collection.count({ img_id: food_id }).then((c) => {
      if (c == 0) {
        console.log(`inserting ${food_id}`);
        collection.insert({ img_id: food_id, yes: 0, no: 0 });
      }
    });
  });
})();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", function (req, res) {
  let idAnswerPairs = req.body;

  let promises = idAnswerPairs.map((v) => {
    return updateImgStats(v.food_id, v.is_sandwich).then((s) => {
      return s;
    });
  });

  Promise.all(promises).then(function (results) {
    res.send({ stats: results });
  });
});

async function updateImgStats(imgId, isSandwich) {
  const img_obj = await collection.findOne({ img_id: imgId });

  return collection
    .findOneAndUpdate(img_obj._id, {
      $set: {
        yes: img_obj.yes + (isSandwich ? 1 : 0),
        no: img_obj.no + (isSandwich ? 0 : 1),
      },
    })
    .then((doc) => {
      return JSON.parse(
        `{"img_id": "${doc.img_id}", "yes":${doc.yes}, "no": ${doc.no}}`
      );
    });
}

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}!`);
});
