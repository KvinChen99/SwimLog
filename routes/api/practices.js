const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

const Practice = require("../../models/Practices");

// route @POST api/practices/add
// @desc Add Practices
// @access public
router.post("/add", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const day = req.body.day;
  const hour = req.body.hour;
  const minute = req.body.minute;
  const email = req.body.email;

  // add a practice
  const newPractice = new Practice({
    email: email,
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    distance: req.body.distance,
    time: req.body.time,
    rating: req.body.rating
  });

  newPractice.save().then(practice => res.json(practice));
});

router.post("/dashboard", (req, res) => {
  const type = req.body.type; // {1:day, 2:month, 3:year}
  const year = req.body.year;
  const month = req.body.month;
  const day = req.body.day;
  var cursor = "";
  // if specific day
  if (type == 1) {
    cursor = db.collection.aggregate([
      { $match: { year: "$year", month: "$month", day: "$day" } },
      {
        $group: {
          _id: "$email",
          total_hours: { $sum: "$time" },
          total_yards: { $sum: "$distance" }
        }
      }
    ]);
    // if specific month
  } else if (type == 2) {
    cursor = db.collection.aggreate([
      { $match: { year: "$year", month: "$month" } },
      {
        $group: {
          _id: "$email",
          total_hours: { $sum: "$time" },
          total_yards: { $sum: "$distance" }
        }
      }
    ]);
    // if specific year
  } else {
    cursor = db.collection.aggregate([
      { $match: { year: "$year" } },
      {
        $group: {
          _id: "$email",
          total_hours: { $sum: "$time" },
          total_yards: { $sum: "$distance" }
        }
      }
    ]);
  }
  // end if-else cursor
  // not sure if this works,
  // if there are practices, return to response a json that includes total_hours, total_yards
  // if not then return empty json
  let data = cursor.toArray();
  if (data.length > 0) return res.status(200).json(data);
  else return res.status(200).json({});
});

module.exports = router;
