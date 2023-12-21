const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedTime: req.requestTime,
    result: users.length,
    data: users,
  });
};

exports.getOneUser = (req, res) => {
  const { id } = req.params;
  const finduser = users.find((tem) => {
    return tem.id == id;
  });
  if (!finduser) {
    res.status(200).json({
      status: "fail",
      message: "Tour Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    data: finduser,
  });
};

exports.register = (req, res) => {
  var newUser = {
    id: users.length,
    ...req.body,
  };
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users),
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
    message: "Register Successfully",
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((tem) => tem.email === email);
  if (!user) {
    return res.status(200).json({
      status: "fail",
      message: "User not found.",
    });
  }
  if (user.password !== password) {
    return res.status(200).json({
      status: "fail",
      message: "Incorrect password.",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Login successful.",
    data: user,
  });
};

exports.editUser = (req, res) => {
  const { id } = req.params;
  const edit = req.body;
  const finduser = users.find((tem) => {
    return tem.id == id;
  });
  if (!finduser) {
    res.status(200).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  const editedUser = users.map((temp) => {
    if (temp.id === id) {
      return { ...user, ...edit };
    }
    return user;
  });
  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(editedUser),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Something Went Wrong.",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Successfully edit profile.",
        data: user,
      });
    }
  );
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const finduser = users.find((temp) => {
    return temp.id === id;
  });
  if (!finduser) {
    res.status(200).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  const newData = users.filter((temp) => temp.id !== id);
  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
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
        message: "Successfully delete the User.",
        data: users,
      });
    }
  );
};
