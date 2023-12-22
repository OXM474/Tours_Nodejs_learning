const fs = require("fs");

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

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedTime: req.requestTime,
    result: tours.length,
    data: tours,
  });
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

exports.addNewTour = (req, res) => {
  var newTour = {
    id: tours.length,
    ...req.body,
  };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "Something Went Wrong.",
        });
      }
    }
  );
  res.status(200).json({
    status: "success",
    message: "Add Successfully",
  });
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
