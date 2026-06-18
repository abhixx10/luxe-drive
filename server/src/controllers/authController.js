import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import generateToken from '../utils/generateToken.js';

const buildAuthResponse = (user) => ({
  user: user.toJSON(),
  token: generateToken(user._id)
});

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, 'Name, email, and password are required');
    }

    if (password.length < 8) {
      throw new ApiError(400, 'Password must be at least 8 characters');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, 'An account with this email already exists');
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: 'Account created successfully',
      ...buildAuthResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    res.status(200).json({
      message: 'Logged in successfully',
      ...buildAuthResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    user: req.user
  });
};
