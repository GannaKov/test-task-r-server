const User = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find();

    if (result.length === 0) {
      throw { status: 404, message: "No user found" };
    }

    res.status(200).json({ status: "success", code: 200, data: result });
  } catch (err) {
    next(err);
  }
};
const getAllContacts = async (req, res, next) => {
  try {
    const result = await User.find({ owner: false });

    if (result.length === 0) {
      throw { status: 404, message: "No user found" };
    }

    res.status(200).json({ status: "success", code: 200, data: result });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({ status: "success", code: 200, data: user });
  } catch (err) {
    next(err);
  }
};

const changeUser = async (req, res, next) => {
  try {
    const user = req.user;
    const id = user.id;
    const newUserFirstName = req.body.firstName || user.firstName;
    const newUserLastName = req.body.lastName || user.lastName;

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
  try {
    const { firstName, lastName, owner } = req.body;
    //save
    const newUser = new User({
      lastName,
      firstName,
      owner: owner !== undefined ? owner : false,
    });
    const result = await newUser.save();
    if (!result) {
      throw { status: 500, message: "Failed to create user" };
    }

    res.status(201).json({ status: "Created ", code: 201, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserById,
  getAllUsers,
  changeUser,
  createUser,
  getAllContacts,
};
