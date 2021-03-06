const db = require("../models");
const User = db.user;
const fs = require("fs");
const validator = require("validator");

exports.ProfileEdit = async (req, res) => {
  try {
    const { surname, gender, email } = req.body;

    const user = await User.findOne({ where: { id: req.userId } });
    if (req.userId != req.params.id)
      return res
        .status(400)
        .json({ error: `You can't edit someone else's account` });

    if (
      req.files &&
      req.files.photo &&
      req.files.photo.mimetype != "image/png" &&
      req.files.photo.mimetype != "image/jpg"
    )
      return res.status(400).json({ error: `image not png or jpg` });

    //photo upload
    if (req.files && req.files.photo) {
      try {
        fs.mkdirSync(`public/users/${req.userId}`);
      } catch (error) {}
      const path = `public/users/${req.userId}/photo${
        req.files.photo.name.match(/\..*$/)[0]
      }`;
      await req.files.photo.mv(path);

      user.photo = path;
    }

    if (surname) {
      user.surname = surname;
    }

    if (gender) {
      if (gender == 0 || gender == 1) user.gender = gender;
      else return res.status(400).json({ error: `wrong gender` });
    }

    if (email) {
      if (validator.isEmail(email)) user.email = email;
      else return res.status(400).json({ error: `wrong email` });
    }

    user.save();
    res.status(200).json({ message: `success` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
exports.GetProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: [
        "id",
        "name",
        "surname",
        "email",
        "photo",
        "gender",
        "createdAt",
      ],
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
exports.GetProfiles = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    if (isNaN(parseInt(page)) || page < 1) {
      return res.status(400).json({ error: `incorrect page number` });
    }

    const profiles = await User.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "name",
        "surname",
        "email",
        "photo",
        "gender",
        "createdAt",
      ],
    });

    res.status(200).json(profiles);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
