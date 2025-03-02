const userService = require("../services/userService");

// @desc Get the logged-in user's data
const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(req.user.id, "userId:here");
    const user = await userService.getUserById(id);

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create or update the logged-in user's data
const addOrUpdateUser = async (req, res) => {
  try {
    const id = req.user.id;
    const { name, lastname, address, phone, email } = req.body;

    if (!name || !lastname || !address || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userService.createOrUpdateUser(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  addOrUpdateUser,
};
