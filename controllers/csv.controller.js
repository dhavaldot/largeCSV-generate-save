const LargeCSV = require("../models/csv.model");
const generate = require("csv-generate");

exports.FindConditional = (req, res) => {
  return new Promise(function (resolve, reject) {
    let text = req.params.text;
    LargeCSV.find({ Col2: { $regex: text } }, function (err, data) {
      if (err) {
        reject(err.message);
      } //else if (data) {
        resolve(data);
     // }
    });
  })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).send({ Success: true, data });
      } else {
        res.status(200).send({ Success: true, message: "No Data Found!" });
      }
    })
    .catch((err) => {
      res.status(400).send({ Success: false, message: err });
    });
};

exports.FindAll = (req, res) => {
  return new Promise(function (resolve, reject) {
    LargeCSV.find({}, function (err, data) {
      if (err) {
        reject(err.message);
      } else if (data) {
        resolve(data);
      }
    });
  })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).send({ Success: true, data });
      } else {
        res.status(200).send({ Success: true, message: "No Data Found!" });
      }
    })
    .catch((err) => {
      res.status(400).send({ Success: false, message: err });
    });
};

exports.GenerateCSV = (req, res) => {
  generate({ length: 10000, objectMode: true, columns: 2 }, (err, records) => {
    if (err) {
      return res.send(err.message);
    }
    //console.log(records);

    for (let i in records) {
      var largeCSV = new LargeCSV({
        Col1: records[i].shift(),
        Col2: records[i].shift(),
      });

      largeCSV
        .save()
        .then((data) => {
          if (!data) {
            return res.send("Data Not Saved.");
          }
        })
        .catch((err) => {
          if (err) {
            return res.send(err);
          }
        });
    }
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    );
    return res.send("Genrated");
  });
};
