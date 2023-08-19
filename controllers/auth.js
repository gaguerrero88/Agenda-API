const { StatusCodes } = require("http-status-codes");
const users = require("../models/users");

const register = async (req, res) => {
  try {
    const user = await users.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Please provide email & password");
    }
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid Credentials");
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ email: user.email, token });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

module.exports = { register, login };
