const fs = require("fs");
const Tour = require("../models/models");
const ApiFeatures = require("../utils/ApiFeatures");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invlid Id .",
    });
  }
  next();
};

exports.checkbody = (req, res, next) => {
  if (!req.body.name || !req.body.price || !req.body.duration) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name ,price, duration .",
    });
  }
  next();
};

exports.aliasTopTour = async (req, res, next) => {
  //Create a copy of req.query
  const modifiedQuery = { ...req.query };

  //Modify the copy
  modifiedQuery.limit = 5;
  modifiedQuery.sort = "-ratingsAverage,price";
  modifiedQuery.fields = "name,price,ratingsAverage,summary,difficulty";

  req.query = await modifiedQuery;

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const apiFeatures = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();

    const Tours = await apiFeatures.currentQuery;

    res.status(200).json({
      status: "success",
      requestedTime: req.requestTime,
      result: Tours.length,
      data: Tours,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Something went Wrong !",
      error: process.env.node_env == "development" ? err : err.message,
    });
  }
};

exports.getOneTour = (req, res) => {
  const { id } = req.params;
  const findtour = tours.find((tem) => {
    return tem.id == id;
  });
  if (!findtour) {
    res.status(200).json({
      status: "fail",
      message: "Tour Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    data: findtour,
  });
};

exports.addNewTour = async (req, res) => {
  try {
    NewTour = await Tour.create(req.body);

    res.status(200).json({
      status: "success",
      message: "Add Successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Something went Worng!",
      error: process.env.node_env == "development" ? err : err.message,
    });
  }
};

exports.editTour = (req, res) => {
  const { id } = req.params;
  const edit = req.body;
  const findtour = tours.find((tem) => {
    return tem.id == id;
  });
  if (!findtour) {
    res.status(200).json({
      status: "fail",
      message: "Tour Not Found",
    });
  }
  const editedTours = tours.map((tour) => {
    if (tour.id === currentid) {
      return { ...tour, ...edit };
    }
    return tour;
  });
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(editedTours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Something Went Wrong.",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Successfully edit the tour.",
        data: tour,
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  const { id } = req.params;
  const findtour = tours.find((tem) => {
    return tem.id == id;
  });
  if (!findtour) {
    res.status(200).json({
      status: "fail",
      message: "Tour Not Found",
    });
  }
  const newData = tours.filter((item) => item.id !== id);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(newData),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Something Went Wrong.",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Successfully delete the tour.",
        data: tours,
      });
    }
  );
};
