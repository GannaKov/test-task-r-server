const User = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  console.log("in get");
  try {
    const result = await User.find();

    if (result.length === 0) {
      throw { status: 404, message: "No user found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  //   const { id } = req.params;

  try {
    console.log("req.user", req.user);
    const user = req.user;
    //const result = await User.findById(id);

    if (!user) {
      throw { status: 404, message: "No user found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const changeUser = async (req, res, next) => {
  //   console.log("req.user", req.user);
  //   console.log("req.body", req.body);
  try {
    //const id = req.params.id;

    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    const user = req.user;
    const id = user.id;
    const newUserFirstName = req.body.firstName || user.firstName;
    const newUserLastName = req.body.lastName || user.lastName;
    console.log("newUser", newUserFirstName, newUserLastName);
    const options = { new: true };
    const result = await User.findByIdAndUpdate(
      id,
      { firstName: newUserFirstName, lastName: newUserLastName },
      options
    );
    if (!result) {
      throw { status: 500, message: "Failed to update" };
    }
    res.status(200).json({
      status: "updated ",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const { firstName, lastName } = req.body;
    //save
    const newUser = new User({
      lastName,
      firstName,
    });
    const result = await newUser.save();
    if (!result) {
      throw { status: 500, message: "Failed to create user" };
    }
    //res.send(newStudent);
    res.status(201).json({ status: "Created ", code: 201, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserById, getAllUsers, changeUser, createUser };
